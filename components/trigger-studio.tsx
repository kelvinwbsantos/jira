'use client';

import { useState } from 'react';
import { labels, type State } from '@/lib/model';
import { simulateTrigger, triggerRules, type TriggerType } from '@/lib/triggers';

const plannedTriggers = [
  { id: 'RF-07', name: 'Entrega antecipada', icon: '↖', rule: 'Conclusão anterior ao prazo definido, com datas válidas e comparáveis.', evidence: 'Exemplo fictício: prazo em 25/09; conclusão em 23/09.', result: 'A entrega chegou 2 dias antes do prazo. Qual foi o impacto para o time?', needs: 'Prazo e data efetiva de conclusão da atividade.' },
  { id: 'RF-08', name: 'Evolução do ritmo pessoal', icon: '↗', rule: 'Comparar a semana com a média das semanas anteriores da própria pessoa.', evidence: 'Exemplo fictício: 5 entregas nesta semana; média individual de 3 nas quatro semanas anteriores.', result: 'Uma mudança no próprio ritmo merece contexto. Não é uma comparação entre colegas.', needs: 'Histórico de conclusões por pessoa, janela de comparação e limiar definidos.' },
  { id: 'RF-09', name: 'Tempo na empresa', icon: '◷', rule: 'A data de admissão alcança um marco de tempo configurado pela empresa.', evidence: 'Exemplo fictício: admissão em 25/09/2024; referência em 25/09/2026; marco de 2 anos.', result: 'Dois anos de trajetória: um momento para valorizar a contribuição ao longo do tempo.', needs: 'Data de admissão e configuração dos marcos.' },
  { id: 'RF-10', name: 'Aniversário', icon: '✦', rule: 'O dia e o mês cadastrados coincidem com a data de referência.', evidence: 'Exemplo fictício: aniversário em 25/09; referência em 25/09/2026.', result: 'Uma oportunidade de celebrar a pessoa, além das entregas.', needs: 'Cadastro de aniversário, finalidade explícita e acesso controlado aos dados.' },
  { id: 'RF-11', name: 'Marco de projetos', icon: '⚑', rule: 'A participação em projetos distintos alcança um marco configurado.', evidence: 'Exemplo fictício: 9 projetos anteriores + participação no 10º projeto; marco configurado em 10.', result: 'Uma trajetória que atravessa projetos e conecta experiências.', needs: 'Histórico de participação em múltiplos projetos e critérios de contagem.' },
];

export default function TriggerStudio({ state, onRecognize, onBoard }: {
  state: State; onRecognize: (person: string) => void; onBoard: () => void;
}) {
  const [selected, setSelected] = useState<TriggerType>('ajuda');
  const [result, setResult] = useState<State | null>(null);
  const [filter, setFilter] = useState('todos');
  const rule = triggerRules.find(r => r.type === selected)!;
  const signals = state.signals.filter(s => filter === 'todos' || s.tipo === filter);

  return <>
    <section className="trigger-heading">
      <span className="eyebrow">DO TRABALHO AO RECONHECIMENTO</span>
      <h2>Uma contribuição acontece.<br /><em>O Notado ajuda a perceber.</em></h2>
      <p>Entenda o que aciona cada sinal, veja a evidência e decida como reconhecer. A tecnologia chama atenção. A mensagem é sua.</p>
      <div className="journey" aria-label="Caminho do reconhecimento">
        <span><b>01</b> Evento no trabalho</span><i aria-hidden="true">→</i><span><b>02</b> Sinal com contexto</span><i aria-hidden="true">→</i><span><b>03</b> Reconhecimento humano</span>
      </div>
    </section>

    <div className="section-heading"><div><span className="eyebrow">EXPLORE OS GATILHOS</span><h3>O que merece um olhar?</h3></div><span className="pill">7 situações · sem pontos ou ranking</span></div>
    <div className="trigger-layout">
      <div className="trigger-menu" aria-label="Tipos de gatilho">{triggerRules.map(r => <button key={r.type} className="trigger-choice" aria-pressed={selected === r.type} onClick={() => { setSelected(r.type); setResult(null); }}><span className="trigger-icon" aria-hidden="true">{r.icon}</span><span><strong>{r.category}</strong><small>{labels[r.type]}</small></span><span className="choice-arrow" aria-hidden="true">↗</span></button>)}</div>
      <section className="trigger-detail" aria-label="Detalhes do gatilho">
        <div className="row"><span className="pill accent">{rule.category}</span><span className="weak">{rule.availability === 'jira' ? 'Disponível na demo e no Jira' : rule.availability === 'seed' ? 'Exemplo com histórico fictício' : 'Disponível na demonstração'}</span></div>
        <h3>{rule.title}</h3>
        <ol className="rule-steps"><li><span>O evento</span><p>{rule.event}</p></li><li><span>A regra</span><p>{rule.rule}</p></li><li><span>Por que olhar</span><p>{rule.impact}</p></li></ol>
        <div className="simulation">
          <div className="section-heading"><b>Experimente este gatilho</b><span className="pill">Simulação isolada</span></div>
          <p>Use um exemplo fictício para ver o resultado. Seu quadro e sua fila permanecem iguais.</p>
          <button className="btn" onClick={() => setResult(simulateTrigger(selected))}>{result ? 'Repetir exemplo' : rule.action} <span aria-hidden="true">→</span></button>
          <div className="simulation-result" role="status" aria-live="polite">{result ? <><span className="eyebrow">{result.signals.length} {result.signals.length === 1 ? 'SINAL NO EXEMPLO' : 'SINAIS NO EXEMPLO'}</span>{result.signals.map(s => <div key={s.id} className={`result-signal ${s.tipo === selected ? 'highlighted' : ''}`}><span className="signal-dot" aria-hidden="true" /><div><b>{result.people[s.pessoa].nome}</b><span>{labels[s.tipo]}</span><p>{s.frase}</p></div></div>)}<p className="simulation-end">Próximo passo: uma pessoa lê o contexto e escreve o reconhecimento.</p></> : <p className="simulation-placeholder">O resultado aparece aqui depois da ação.</p>}</div>
        </div>
      </section>
    </div>

    <section className="live-signals" aria-label="Sinais da sessão">
      <div className="section-heading"><div><span className="eyebrow">AGORA, NO SEU ESPAÇO</span><h3>Sinais que você pode reconhecer</h3></div><button className="btn sec" onClick={onBoard}>Abrir quadro →</button></div>
      <p className="lede">{state.source === 'demo' ? 'Dados fictícios da sua sessão. Avance atividades no quadro para gerar novos sinais.' : 'Conclusões observadas nas sincronizações e referências marcadas neste espaço.'}</p>
      <label className="signal-filter">Filtrar por gatilho <select value={filter} onChange={e => setFilter(e.target.value)}><option value="todos">Todos ({state.signals.length})</option>{Object.entries(labels).map(([key, label]) => <option key={key} value={key}>{label} ({state.signals.filter(s => s.tipo === key).length})</option>)}</select></label>
      <div className="signal-grid">{[...signals].reverse().map(s => <article className="signal-card" key={s.id}><span className="pill">{labels[s.tipo] || s.tipo}</span><h4>{state.people[s.pessoa]?.nome || 'Sem responsável'}</h4><p>{s.frase}</p><button className="btn sec" onClick={() => onRecognize(s.pessoa)}>Reconhecer contribuição →</button></article>)}</div>
      {!signals.length && <div className="empty-signals"><b>Nenhum sinal neste filtro.</b><p>Experimente outro gatilho ou acompanhe novas contribuições no quadro.</p></div>}
    </section>
    <section className="planned-triggers" aria-label="Gatilhos previstos no DRS">
      <div className="section-heading"><div><span className="eyebrow">A VISÃO DO PRODUTO</span><h3>Outros momentos que merecem ser vistos</h3></div><span className="pill">Prévias do DRS · ainda não automatizadas</span></div>
      <p className="lede">Abra um exemplo para conhecer a regra e os dados necessários. Estas prévias ilustrativas não geram sinais na sua sessão.</p>
      <div className="planned-grid">{plannedTriggers.map(trigger => <details key={trigger.id} className="planned-card"><summary><span className="trigger-icon" aria-hidden="true">{trigger.icon}</span><span>{trigger.name}<small>{trigger.id} · previsto</small></span><span className="choice-arrow" aria-hidden="true">+</span></summary><div className="planned-content"><b>Regra proposta</b><p>{trigger.rule}</p><b>Evidência</b><p>{trigger.evidence}</p><blockquote>{trigger.result}</blockquote><b>Dados necessários</b><p>{trigger.needs}</p></div></details>)}</div>
    </section>
    <div className="scope-note"><b>O que já acontece e o que vem depois</b><p>Na demonstração, conclusão, ajuda, complexidade, avaliação, estreia e referência geram sinais. Ausência usa um histórico fictício estático; o período configurável do RF-06 ainda está previsto. No Jira, esta versão acompanha novas conclusões e referências; a primeira importação não gera sinais retroativos. As prévias RF-07 a RF-11 não são automações ativas. Volume é apenas contexto, nunca mérito por si só.</p></div>
  </>;
}
