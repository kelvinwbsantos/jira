import test from 'node:test';
import assert from 'node:assert/strict';
import { simulateTrigger, triggerRules } from '../lib/triggers';

test('cada exemplo produz o gatilho anunciado', () => {
  for (const rule of triggerRules) {
    const result = simulateTrigger(rule.type);
    assert.ok(result.signals.some(s => s.tipo === rule.type), rule.type);
  }
});

test('colaboração destaca quem ajudou e repetir a simulação não acumula sinais', () => {
  const first = simulateTrigger('ajuda');
  assert.deepEqual(first.signals.map(s => [s.pessoa, s.tipo]), [
    ['bia', 'conclusao'], ['bia', 'estreia'], ['lara', 'ajuda'],
  ]);
  first.people.lara.nome = 'Alterado';
  const next = simulateTrigger('ajuda');
  assert.equal(next.people.lara.nome, 'Lara Pontes');
  assert.equal(next.signals.length, 3);
  assert.equal(next.feed.length, 0);
});
