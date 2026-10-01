import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ecarts } from './gabarits.ts'

test('UC-008 nominal : les gabarits copiables de gabarits/ reproduisent à l\'identique les blocs du protocole de reproduction (CS0.14)', () => {
  assert.deepEqual(ecarts(), [])
})
