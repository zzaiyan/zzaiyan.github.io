import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-ris";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicationsPath = path.join(root, "_data", "publications.json");
const outputPath = path.join(root, "_data", "generated", "citations.json");
const styleDir = path.join(root, "scripts", "csl");

const publications = JSON.parse(fs.readFileSync(publicationsPath, "utf8"));
const references = Object.create(null);
const scholarIds = new Set();
const groups = ["journal", "conference", "preprint"];
const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const isText = (value) => typeof value === "string" && value.trim().length > 0;

if (!isObject(publications) || Object.keys(publications).some((key) => !groups.includes(key))) {
  throw new Error("Publications must be grouped into journal, conference, and preprint");
}
for (const group of groups) {
  if (!Array.isArray(publications[group])) {
    throw new Error(`Missing publication group: ${group}`);
  }
  for (const publication of publications[group]) {
    if (!isObject(publication)) throw new Error(`${group}: Invalid publication record`);
    const { id, citation, display, scholar_id: scholarId } = publication;
    const reject = (reason) => {
      throw new Error(`${group}/${id}: ${reason}`);
    };
    if (!isText(id) || !/^[A-Za-z0-9_-]+$/.test(id) || Object.hasOwn(references, id)) {
      reject("Invalid or duplicate ID");
    }
    if (Object.keys(publication).some((key) => !["id", "citation", "display", "scholar_id"].includes(key))) {
      reject("Unexpected publication field");
    }
    if (
      !isObject(citation) || "id" in citation || !isText(citation.type) ||
      !isText(citation.title) || !isText(citation["container-title"])
    ) {
      reject("Missing citation metadata, or duplicated citation.id");
    }
    if (
      !Array.isArray(citation.author) || citation.author.length === 0 ||
      citation.author.some((author) => !Array.isArray(author) || author.length !== 2 || !author.every(isText))
    ) {
      reject("Each author must be a [family, given] pair of nonempty strings");
    }
    if (!Number.isInteger(citation.issued?.["date-parts"]?.[0]?.[0])) {
      reject("Missing publication year");
    }
    if (citation.DOI !== undefined && (!isText(citation.DOI) || !citation.DOI.startsWith("10."))) {
      reject("DOI must be a bare DOI");
    }
    if (!isObject(display)) reject("Missing display settings");
    if (display.visible !== undefined && typeof display.visible !== "boolean") {
      reject("visible must be a boolean");
    }
    if (display.layout !== undefined && display.layout !== "compact") reject("Unknown layout");
    if (display.visible !== false && display.layout !== "compact" && !isText(display.image)) {
      reject("Featured cards require an image");
    }
    if (display.tags !== undefined && (!Array.isArray(display.tags) || display.tags.some((tag) => !isText(tag)))) {
      reject("tags must be an array of text");
    }
    if (
      !Array.isArray(display.links) ||
      display.links.some((link) => !isObject(link) || !isText(link.name) || !isText(link.url))
    ) {
      reject("Invalid display links");
    }
    if (display.author_roles !== undefined) {
      if (!isObject(display.author_roles)) reject("Invalid author roles");
      for (const [role, positions] of Object.entries(display.author_roles)) {
        if (
          !["equal_contribution", "corresponding"].includes(role) ||
          !Array.isArray(positions) || new Set(positions).size !== positions.length ||
          positions.some((position) => !Number.isInteger(position) || position < 1 || position > citation.author.length)
        ) {
          reject("Invalid author role or author position");
        }
      }
    }
    if (scholarId !== undefined) {
      if (!isText(scholarId) || !/^[A-Za-z0-9_-]+:[A-Za-z0-9_-]+$/.test(scholarId) || scholarIds.has(scholarId)) {
        reject("Invalid or duplicate Scholar ID");
      }
      scholarIds.add(scholarId);
    }
    const reference = {
      id,
      ...citation,
      author: citation.author.map(([family, given]) => ({ family: family.trim(), given: given.trim() })),
    };
    if (reference.DOI && !reference.URL) reference.URL = `https://doi.org/${reference.DOI}`;
    references[id] = reference;
  }
}
const cslConfig = plugins.config.get("@csl");
const bibtexConfig = plugins.config.get("@bibtex");

bibtexConfig.format.useIdAsLabel = true;
bibtexConfig.constants.fieldTypes.title = ["field", "literal"];
cslConfig.styles.add(
  "ieee-local",
  fs.readFileSync(path.join(styleDir, "ieee.csl"), "utf8"),
);
cslConfig.styles.add(
  "gbt7714-local",
  fs.readFileSync(path.join(styleDir, "gb-t-7714-2015-numeric.csl"), "utf8"),
);

function formatBibliography(cite, style) {
  return cite
    .format("bibliography", {
      format: "text",
      lang: "en-US",
      style,
    })
    .trim();
}

function formatBibtex(reference) {
  const protectedTitle = `<span class="nocase">${reference.title}</span>`;
  return new Cite({ ...reference, title: protectedTitle })
    .format("bibtex")
    .trim();
}

function buildOutputs() {
  return Object.fromEntries(
    Object.entries(references).sort(([a], [b]) => a.localeCompare(b, "en")).map(([key, reference]) => {
      const cite = new Cite(reference);
      return [key, {
        key,
        title: reference.title,
        formats: {
          bibtex: formatBibtex(reference),
          ieee: formatBibliography(cite, "ieee-local"),
          apa: formatBibliography(cite, "apa"),
          "gb-t-7714": formatBibliography(cite, "gbt7714-local"),
          ris: cite.format("ris").trim(),
          "csl-json": JSON.stringify(reference, null, 2),
        },
      }];
    }),
  );
}

const output = `${JSON.stringify(buildOutputs(), null, 2)}\n`;
const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  const current = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf8")
    : "";
  if (current !== output) {
    console.error("Citation output is stale. Run: npm run data:build");
    process.exit(1);
  }
  console.log(`Citation output is up to date (${Object.keys(references).length} entries).`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output);
  console.log(`Generated citation output for ${Object.keys(references).length} entries.`);
}
