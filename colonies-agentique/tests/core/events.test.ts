import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createEventQueue } from '../../src/core/events.ts'
import { createStream } from '../../src/core/random.ts'

test('UC-001 nominal : 10⁴ événements aléatoires, dont des égalités forcées, sortent dans l\'ordre (temps, insertion)', () => {
  const q = createEventQueue(), g = createStream(20261001n, 'environment')
  for (let k = 0; k < 10_000; k++) q.push(g.int(100), k)   // 100 temps distincts seulement : environ 100 égalités par temps
  let precedent = { time: -1, kind: -1 }, sortis = 0
  for (let e = q.pop(); e; e = q.pop(), sortis++) {
    assert.ok(e.time > precedent.time || (e.time === precedent.time && e.kind > precedent.kind), `${JSON.stringify(precedent)} puis ${JSON.stringify(e)}`)
    precedent = e
  }
  assert.equal(sortis, 10_000)
  assert.equal(q.size, 0)
})

test('UC-001 nominal : l\'annulation paresseuse retire les événements déjà planifiés d\'un agent, pas ceux planifiés ensuite', () => {
  const q = createEventQueue(2)
  q.push(1, 10, 3); q.push(2, 11, 4); q.push(3, 12, 3)
  q.invalidate(3)
  q.push(4, 13, 3)
  const sortis: number[] = []
  for (let e = q.pop(); e; e = q.pop()) sortis.push(e.kind)
  assert.deepEqual(sortis, [11, 13])
  assert.throws(() => q.push(Infinity, 0))
})
