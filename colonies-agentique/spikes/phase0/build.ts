// SPK9, SPK12 : bundles esbuild (IIFE minifiés) de la page et du worker, JavaScript injecté dans le HTML.
// Deux builds successifs doivent donner le même hachage. Usage : node spikes/phase0/build.ts
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const ICI = path.dirname(fileURLToPath(import.meta.url))
export const DIST = path.join(ICI, 'dist')
const sha = (s: string | Uint8Array) => createHash('sha256').update(s).digest('hex')

async function bundle(entree: string, define: Record<string, string> = {}): Promise<string> {
  const r = await build({ entryPoints: [path.join(ICI, entree)], bundle: true, format: 'iife', minify: true, target: 'es2022', write: false, define, legalComments: 'none' })
  return r.outputFiles[0]!.text
}

export async function construire() {
  const worker = await bundle('worker.ts')
  const page = await bundle('page.ts', { __SOURCE_WORKER__: JSON.stringify(worker) })
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Spike phase 0</title><link rel="icon" href="data:,">
<style>body{font:14px system-ui,sans-serif;margin:16px;background:#fff;color:#111}canvas{border:1px solid #888;max-width:100%}pre{white-space:pre-wrap}</style></head>
<body><h1>Spike de la phase 0</h1><canvas id="scene" width="600" height="600"></canvas><pre id="journal"></pre>
<script>${page.replace(/<\/script/gi, '<\\/script')}</script></body></html>
`
  return { html, worker, tailles: { page: Buffer.byteLength(page), worker: Buffer.byteLength(worker), html: Buffer.byteLength(html) } }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const un = await construire(), deux = await construire()
  fs.mkdirSync(DIST, { recursive: true })
  fs.writeFileSync(path.join(DIST, 'index.html'), un.html)
  fs.writeFileSync(path.join(DIST, 'worker.js'), un.worker)
  const resultat = { identiques: sha(un.html) === sha(deux.html) && sha(un.worker) === sha(deux.worker), sha256: { html: sha(un.html), worker: sha(un.worker) }, octets: un.tailles }
  console.log(JSON.stringify(resultat, null, 2))
  fs.mkdirSync(path.join(ICI, 'resultats'), { recursive: true })
  fs.writeFileSync(path.join(ICI, 'resultats', 'build.json'), JSON.stringify(resultat, null, 2) + '\n')
}
