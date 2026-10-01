// Journal des appels LLM (05 §5 et §8.6) : une ligne JSONL par appel; schéma seulement, aucun appel d'API ici.
// T0.22 : le validateur accepte l'enregistrement complet et rejette l'absence du modèle répondu, de l'effort, des paramètres
// (corps de requête) ou des jetons. Aucun contrôle d'échantillonnage n'est supposé (ni `seed`, ni `temperature`).

export interface LlmCallRecord {
  schema: 1
  runId: string
  scenarioHash: string
  seed: string
  step: number
  agentId: number
  requestedModel: string
  responseModel: string             // response.model
  effort: string                    // fixé et consigné (C-009)
  thinking?: unknown                // configuration de réflexion telle qu'envoyée
  request: unknown                  // corps complet de la requête, sans secret
  requestHash: string               // SHA-256 du JSON canonique de la requête; clé de cassette avec (runId, step, agentId)
  response: { content: unknown; stopReason: string; usage: Record<string, number> }
  latencyMs: number
  costUsd: number
  region?: string
  requestId?: string
  sdkVersion: string
  timestamp: string
  permutationSeed?: string          // graine de la permutation de l'ordre des agents
}

export class AppelLlmInvalide extends Error {}

const CHAINES = ['runId', 'scenarioHash', 'seed', 'requestedModel', 'responseModel', 'effort', 'sdkVersion', 'timestamp'] as const
const NOMBRES = ['step', 'agentId', 'latencyMs', 'costUsd'] as const
const SECRET = /sk-ant-[\w-]{8,}|"x-api-key"|"authorization"/i

/** Vérifie une ligne du journal; lève AppelLlmInvalide en nommant le premier champ fautif. */
export function validerAppelLlm(raw: unknown): LlmCallRecord {
  const r = raw as Record<string, unknown>
  const faute = (champ: string, regle: string) => new AppelLlmInvalide(`Appel LLM invalide : ${champ} : ${regle}`)
  if (typeof raw !== 'object' || raw === null) throw faute('(racine)', 'objet attendu')
  if (r.schema !== 1) throw faute('schema', '1 attendu')
  for (const c of CHAINES) if (typeof r[c] !== 'string' || r[c] === '') throw faute(c, 'chaîne non vide requise')
  for (const c of NOMBRES) if (typeof r[c] !== 'number' || !Number.isFinite(r[c])) throw faute(c, 'nombre fini requis')
  if (r.request === undefined || r.request === null) throw faute('request', 'corps de requête requis (paramètres)')
  if (typeof r.requestHash !== 'string' || !/^[0-9a-f]{64}$/.test(r.requestHash)) throw faute('requestHash', 'SHA-256 en hexadécimal')
  const rep = r.response as Record<string, unknown> | undefined
  if (typeof rep !== 'object' || rep === null) throw faute('response', 'objet requis')
  if (rep.content === undefined) throw faute('response.content', 'requis')
  if (typeof rep.stopReason !== 'string') throw faute('response.stopReason', 'chaîne requise')
  const usage = rep.usage as Record<string, unknown> | undefined
  if (typeof usage !== 'object' || usage === null || !['input_tokens', 'output_tokens'].every(k => typeof usage[k] === 'number'))
    throw faute('response.usage', 'jetons d\'entrée et de sortie requis')
  if (SECRET.test(JSON.stringify(raw))) throw faute('(contenu)', 'secret d\'API détecté (NFR-009)')
  return raw as LlmCallRecord
}
