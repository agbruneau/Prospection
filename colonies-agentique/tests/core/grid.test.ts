import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createGrille, facteurEvaporation, nombreDeDiffusion, voisinage } from '../../src/core/grid.ts'
import { createStream } from '../../src/core/random.ts'

test('UC-001 nominal : l\'évaporation suit la formule fermée 2^(−t/t½) et remet à zéro sous le seuil', () => {
  const g = createGrille({ nx: 4, ny: 4, facteur: facteurEvaporation(1, 10), seuil: 1e-3 })
  g.deposer(1, 1, 1)
  for (let n = 0; n < 50; n++) g.avancer()
  assert.ok(Math.abs(g.cellule(1, 1) / 2 ** -5 - 1) < 1e-12, String(g.cellule(1, 1)))
  for (let n = 0; n < 50; n++) g.avancer()   // 2^(−10) ≈ 9,8e-4 < seuil
  assert.equal(g.cellule(1, 1), 0)
})

test('UC-001 A1 : une diffusion explicite à r > 1/4 est refusée', () => {
  assert.throws(() => createGrille({ nx: 8, ny: 8, facteur: 1, seuil: 0, r: nombreDeDiffusion(1, 0.3, 1) }), /diffusion explicite instable : r = 0\.3 > 1\/4/)
  assert.doesNotThrow(() => createGrille({ nx: 8, ny: 8, facteur: 1, seuil: 0, r: 0.25 }))
})

test('UC-001 nominal : l\'évaporation paresseuse donne exactement les valeurs de l\'évaporation immédiate', () => {
  const o = { nx: 16, ny: 16, facteur: facteurEvaporation(1, 7), seuil: 1e-6 }
  const immediate = createGrille(o), paresseuse = createGrille({ ...o, paresseuse: true }), g = createStream(7n, 'environment')
  for (let pas = 0; pas < 300; pas++) {
    if (g.uniform() < 0.3) { const x = g.uniform() * 16, y = g.uniform() * 16, q = g.uniform(); immediate.deposer(x, y, q); paresseuse.deposer(x, y, q) }
    if (g.uniform() < 0.2) { const x = g.uniform() * 16, y = g.uniform() * 16; assert.equal(paresseuse.lire(x, y), immediate.lire(x, y)) }
    immediate.avancer(); paresseuse.avancer()
  }
  for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) assert.equal(paresseuse.cellule(i, j), immediate.cellule(i, j))
})

test('UC-001 nominal : la diffusion conserve la masse, et Δx et Δx/2 donnent la même statistique de colonie à 5 % près', () => {
  // Masse 1 au centre d'un tore de côté 1; D = 0,01; T = 0,625. Statistique : part de la masse dans un rayon de 0,1.
  const D = 0.01, T = 0.625, R = 0.1
  const statistique = (n: number) => {
    const dx = 1 / n, r = 0.2, dt = r * dx * dx / D, pas = Math.round(T / dt)
    const g = createGrille({ nx: n, ny: n, facteur: 1, seuil: 0, r })
    g.deposer(n / 2, n / 2, 1)
    for (let k = 0; k < pas; k++) g.avancer()
    let masse = 0, dedans = 0
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const c = g.cellule(i, j); masse += c
      if (Math.hypot((i - n / 2) * dx, (j - n / 2) * dx) < R) dedans += c
    }
    return { masse, dedans }
  }
  const grossier = statistique(64), fin = statistique(128)   // à 32 cellules, le comptage par centres de cellule quantifie le disque (écart de 11 %)
  assert.ok(Math.abs(grossier.masse - 1) < 1e-12 && Math.abs(fin.masse - 1) < 1e-12)
  const analytique = 1 - Math.exp(-(R ** 2) / (2 * 2 * D * T))   // gaussienne de variance 2DT par dimension
  assert.ok(Math.abs(grossier.dedans / fin.dedans - 1) < 0.05, `${grossier.dedans} contre ${fin.dedans}`)
  assert.ok(Math.abs(fin.dedans / analytique - 1) < 0.05, `${fin.dedans} contre ${analytique}`)
})

test('UC-001 nominal : dépôt et lecture bilinéaires; voisinages de Moore et de von Neumann en 2D et en 3D', () => {
  const g = createGrille({ nx: 8, ny: 8, facteur: 1, seuil: 0 })
  g.deposer(2.25, 3.5, 1)
  assert.deepEqual([g.cellule(2, 3), g.cellule(3, 3), g.cellule(2, 4), g.cellule(3, 4)], [0.375, 0.125, 0.375, 0.125])
  assert.equal(g.lire(2, 3), 0.375)
  assert.deepEqual([voisinage('moore', 2).length, voisinage('von-neumann', 2).length, voisinage('moore', 3).length, voisinage('von-neumann', 3).length], [8, 4, 26, 6])
})
