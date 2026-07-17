import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-ris";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const referencesPath = path.join(root, "_data", "references.json");
const outputPath = path.join(root, "_data", "citation_outputs.json");
const styleDir = path.join(root, "scripts", "csl");

const references = JSON.parse(fs.readFileSync(referencesPath, "utf8"));
const cslConfig = plugins.config.get("@csl");
const bibtexConfig = plugins.config.get("@bibtex");

bibtexConfig.format.useIdAsLabel = true;
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

function buildOutputs() {
  return Object.fromEntries(
    Object.entries(references).map(([key, reference]) => {
      const cite = new Cite(reference);
      return [key, {
        key,
        title: reference.title,
        formats: {
          bibtex: cite.format("bibtex").trim(),
          ris: cite.format("ris").trim(),
          "csl-json": JSON.stringify(reference, null, 2),
          ieee: formatBibliography(cite, "ieee-local"),
          apa: formatBibliography(cite, "apa"),
          "gb-t-7714": formatBibliography(cite, "gbt7714-local"),
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
    console.error("Citation output is stale. Run: npm run citations:build");
    process.exit(1);
  }
  console.log(`Citation output is up to date (${Object.keys(references).length} entries).`);
} else {
  fs.writeFileSync(outputPath, output);
  console.log(`Generated citation output for ${Object.keys(references).length} entries.`);
}
