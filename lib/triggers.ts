import { applyAction } from './actions';
import { initialState, type State } from './model';

export const triggerRules = [
  { type: 'ajuda', icon: '↗', title: 'Quem ajudou também aparece', category: 'Colaboração', event: 'Ao concluir, Beatriz indica Lara como apoio.', rule: 'Uma pessoa diferente da responsável é indicada na conclusão.', impact: 'O sinal vai para quem ajudou, mesmo sem ser dono da atividade.', action: 'Concluir com ajuda de Lara', availability: 'demo' },
  { type: 'complexa', icon: '◇', title: 'O desafio por trás da entrega', category: 'Complexidade', event: 'Tiago conclui uma migração de dados.', rule: 'A atividade é concluída e seu tipo está definido como de alta complexidade.', impact: 'O contexto da dificuldade acompanha a entrega. Prioridade não define complexidade.', action: 'Concluir migração', availability: 'demo' },
  { type: 'acima', icon: '✦', title: 'Qualidade percebida por alguém', category: 'Qualidade', event: 'Uma entrega avaliada acima do esperado chega à conclusão.', rule: 'A avaliação explícita é registrada no avanço para review; o sinal nasce na conclusão.', impact: 'O reconhecimento parte de uma avaliação humana, não de uma nota automática.', action: 'Concluir entrega avaliada', availability: 'demo' },
  { type: 'estreia', icon: '◎', title: 'Toda primeira vez conta', category: 'Aprendizado', event: 'Beatriz conclui sua primeira funcionalidade desse tipo.', rule: 'A atividade chega à conclusão com a indicação de primeira entrega desse tipo.', impact: 'Um passo de desenvolvimento ganha visibilidade, mesmo numa entrega pequena.', action: 'Concluir primeira entrega', availability: 'demo' },
  { type: 'referencia', icon: '⚑', title: 'Uma entrega que ensina o time', category: 'Referência', event: 'Uma atividade concluída é marcada como referência.', rule: 'Alguém marca explicitamente a entrega como exemplo. Repetir a marcação não duplica o sinal.', impact: 'O valor compartilhado com o time fica visível para quem reconhece.', action: 'Marcar entrega como referência', availability: 'jira' },
  { type: 'conclusao', icon: '✓', title: 'Um momento para olhar', category: 'Conclusão', event: 'Uma atividade muda para a última etapa do processo.', rule: 'Na demo, ao concluir. No Jira, ao observar uma nova conclusão entre sincronizações.', impact: 'A entrega abre uma oportunidade de reconhecimento; a pessoa decide o que ela significou.', action: 'Concluir atividade', availability: 'jira' },
  { type: 'ausencia', icon: '◷', title: 'Quem ficou fora do radar?', category: 'Atenção', event: 'Sofia aparece com 97 dias sem reconhecimento no exemplo.', rule: 'O exemplo contém um sinal de ausência. A fila prioriza o maior tempo conhecido sem reconhecimento.', impact: 'É um convite para olhar o contexto, sem comparar o mérito das pessoas.', action: 'Ver exemplo de ausência', availability: 'seed' },
] as const;

export type TriggerType = typeof triggerRules[number]['type'];

// Uses the actual domain rules in an isolated workspace. Never persists demo events.
export function simulateTrigger(type: TriggerType): State {
  const state = initialState();
  state.signals = [];
  if (type === 'ausencia') {
    state.signals = initialState().signals.filter(s => s.pessoa === 'sofia');
    return state;
  }
  if (type === 'referencia') return applyAction(state, { action: 'reference', id: '7' });
  const card = state.cards.find(c => c.id === (type === 'complexa' ? '2' : type === 'acima' ? '1' : '4'))!;
  card.fase = 3;
  card.aval = type === 'acima' ? 'acima' : 'esperado';
  card.estreia = type === 'estreia' || type === 'ajuda';
  return applyAction(state, { action: 'advance', id: card.id, helpers: type === 'ajuda' ? ['lara'] : [] });
}
