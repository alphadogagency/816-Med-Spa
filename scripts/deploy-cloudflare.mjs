import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));
const git = (...args) => execFileSync("git", args, { cwd: projectRoot, encoding: "utf8" }).trim();

if (git("branch", "--show-current") !== "main" || git("status", "--porcelain")) {
  console.error("Production deployment requires a clean main branch. Commit and push the intended changes first.");
  process.exit(1);
}

const result = spawnSync(process.execPath, [
  wrangler,
  "pages", "deploy", "dist",
  "--project-name", "816-med-spa",
  "--branch", "main",
  "--commit-hash", git("rev-parse", "HEAD"),
  "--commit-message", git("log", "-1", "--format=%s"),
], {
  cwd: projectRoot,
  env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: "ea6886430ff777f0b690f6805628cecd" },
  stdio: "inherit",
});

if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
