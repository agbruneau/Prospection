import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validerAppelLlm } from '../../src/policies/llm-log.ts'

// Enregistrement-échantillon complet (valeurs symboliques; aucun appel d'API).
const echantillon = () => ({
  schema: 1, runId: '0123456789abcdef', scenarioHash: 'fedcba9876543210', seed: '20261001', step: 3, agentId: 2,
  requestedModel: 'modele-demande', responseModel: 'modele-repondu', effort: 'medium', thinking: { type: 'adaptive' },
  request: { model: 'modele-demande', max_tokens: 300, messages: [{ role: 'user', content: 'observation sérialisée' }] },
  requestHash: 'a'.repeat(64), response: { content: [{ type: 'text', text: 'action' }], stopReason: 'end_turn', usage: { input_tokens: 120, output_tokens: 8 } },
  latencyMs: 812, costUsd: 0.0004, sdkVersion: '1.0.0', timestamp: '2026-10-01T12:00:00Z',
})

test('UC-001 nominal : T0.22 le journal LLM accepte l\'enregistrement complet et rejette l\'absence du modèle répondu, de l\'effort, des paramètres ou des jetons', () => {
  assert.doesNotThrow(() => validerAppelLlm(echantillon()))
  const sans = (chemin: string) => {
    const e = echantillon() as Record<string, any>
    const [a, b] = chemin.split('.')
    if (b) delete e[a!][b]; else delete e[a!]
    return e
  }
  for (const [chemin, champ] of [['responseModel', 'responseModel'], ['effort', 'effort'], ['request', 'request'], ['response.usage', 'response.usage'], ['requestHash', 'requestHash'], ['costUsd', 'costUsd']] as const)
    assert.throws(() => validerAppelLlm(sans(chemin)), new RegExp(`Appel LLM invalide : ${champ.replace('.', '\\.')} :`), chemin)
  const sansSortie = echantillon(); delete (sansSortie.response.usage as Record<string, number>).output_tokens
  assert.throws(() => validerAppelLlm(sansSortie), /response\.usage/)
})

test('UC-001 nominal : T0.22 aucun contrôle d\'échantillonnage supposé (ni seed ni temperature requis), et un secret d\'API est refusé', () => {
  const e = echantillon()
  assert.ok(!('seed' in e.request) && !('temperature' in e.request))
  assert.doesNotThrow(() => validerAppelLlm(e))
  const avecCle = echantillon(); (avecCle.request as Record<string, unknown>).headers = { 'x-api-key': 'sk-ant-api03-ABCDEFGHIJ' }
  assert.throws(() => validerAppelLlm(avecCle), /secret d'API/)
})
