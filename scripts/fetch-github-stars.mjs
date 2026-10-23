import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(root, "_data", "github_stars.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const repositories = Object.keys(snapshot);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "zzaiyan-academic-homepage",
  "X-GitHub-Api-Version": "2026-03-10",
};

if (token) headers.Authorization = `Bearer ${token}`;

for (const repo of repositories) {
  const cached = snapshot[repo];
  if (
    !/^[\w.-]+\/[\w.-]+$/.test(repo) ||
    !cached ||
    (cached.stars !== null &&
      (!Number.isSafeInteger(cached.stars) || cached.stars < 0))
  ) {
    throw new Error(`Invalid GitHub stars snapshot entry: ${repo}`);
  }
}

let refreshed = 0;

for (const repo of repositories) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`${repo}: HTTP ${response.status}; keeping cached stars.`);
      if (
        response.status === 401 ||
        response.status === 429 ||
        (response.status === 403 &&
          (response.headers.get("x-ratelimit-remaining") === "0" ||
            response.headers.has("retry-after")))
      ) break;
      continue;
    }

    const data = await response.json();
    if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) {
      throw new Error("GitHub returned an invalid star count");
    }

    snapshot[repo] = {
      stars: data.stargazers_count,
      updated_at: new Date().toISOString(),
    };
    refreshed += 1;
    console.log(`${repo}: ${data.stargazers_count} stars`);
  } catch (error) {
    console.warn(`${repo}: ${error.message}; keeping cached stars.`);
  }
}

if (refreshed > 0) {
  const temporaryPath = `${snapshotPath}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`);
    fs.renameSync(temporaryPath, snapshotPath);
  } finally {
    fs.rmSync(temporaryPath, { force: true });
  }
}

console.log(`Refreshed ${refreshed}/${repositories.length} repositories.`);
