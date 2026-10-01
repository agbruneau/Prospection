// Cible A : page statique servie telle quelle (aucun en-tête de sécurité ajouté), sur l'interface locale seulement.
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const TYPES: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' }

export function servir(repertoire: string, port = 0): Promise<{ url: string; fermer: () => void }> {
  const dossier = path.resolve(repertoire)
  const serveur = http.createServer((req, res) => {
    const nom = decodeURIComponent((req.url ?? '/').split('?')[0]!).replace(/^\/+/, '') || 'index.html'
    const fichier = path.join(dossier, path.normalize(nom))
    if (!fichier.startsWith(dossier) || !fs.existsSync(fichier)) { res.writeHead(404).end(); return }
    res.writeHead(200, { 'content-type': TYPES[path.extname(fichier)] ?? 'application/octet-stream' })
    fs.createReadStream(fichier).pipe(res)
  })
  return new Promise(ok => serveur.listen(port, '127.0.0.1', () => {
    const { port: p } = serveur.address() as { port: number }
    ok({ url: `http://127.0.0.1:${p}/`, fermer: () => serveur.close() })
  }))
}
