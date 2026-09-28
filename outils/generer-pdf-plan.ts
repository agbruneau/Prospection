// Régénère le PDF d'un plan de prédication à partir de son Markdown : pandoc, puis Chrome headless.
// Usage : node outils/generer-pdf-plan.ts Plan-Predication-A-l-image-de-Christ.md
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CSS = `@page { size: Letter; margin: 18mm 18mm 16mm; }
body { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.45; color: #1a1a1a; max-width: none; margin: 0; }
h1 { font-size: 22pt; color: #1A2A40; margin: 0 0 4pt; border-bottom: 2px solid #B8862B; padding-bottom: 4pt; }
h2 { font-size: 13.5pt; color: #1A2A40; margin: 16pt 0 5pt; border-bottom: 1px solid #d9c9a3; padding-bottom: 2pt; page-break-after: avoid; }
p, li { margin: 3pt 0; text-align: justify; hyphens: auto; }
ul, ol { margin: 3pt 0 3pt 16pt; padding: 0; }
em { color: #5a4a2a; }
strong { color: #1A2A40; }
hr { border: 0; border-top: 1px solid #d9c9a3; margin: 10pt 0; }
table { border-collapse: collapse; margin: 6pt 0; font-size: 10pt; }
th, td { border-bottom: 1px solid #e3d6b8; padding: 3pt 10pt 3pt 0; text-align: left; }
th { color: #B8862B; font-variant: small-caps; }
a { color: #1A2A40; }
header#title-block-header { display: none; }
`;

const arg = process.argv[2];
if (!arg?.endsWith(".md") || !existsSync(arg)) throw new Error("Usage : node outils/generer-pdf-plan.ts <plan>.md");
const md = resolve(arg), pdf = md.slice(0, -3) + ".pdf";
const titre = readFileSync(md, "utf8").match(/^# (.+)$/m)?.[1] ?? "Plan";
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome ou Edge introuvable");

const css = join(tmpdir(), "plan-predication.css"), html = join(tmpdir(), "plan-predication.html");
writeFileSync(css, CSS);
// lists_without_preceding_blankline : une liste collée à la ligne en gras qui la précède reste une liste, comme sur GitHub.
execFileSync("pandoc", [md, "-f", "markdown+lists_without_preceding_blankline", "-s", "--embed-resources", "--css", css,
  "--metadata", `title=${titre} · Plan de prédication`, "--metadata", "lang=fr", "-o", html]);
rmSync(pdf, { force: true });
execFileSync(chrome, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, pathToFileURL(html).href], { stdio: "ignore" });
if (!existsSync(pdf) || statSync(pdf).size === 0) throw new Error("PDF non produit : " + pdf);
console.log("écrit :", pdf);
