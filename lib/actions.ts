import { z } from 'zod';
import type { State } from './model';
export const actionSchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('advance'),id:z.string(),assessment:z.enum(['esperado','acima']).optional(),helpers:z.array(z.string()).max(2).default([])}),
 z.object({action:z.literal('reference'),id:z.string()}),
 z.object({action:z.literal('dismiss'),person:z.string()}),
 z.object({action:z.literal('recognize'),person:z.string(),text:z.string().trim().min(3).max(3000),visibility:z.enum(['publico','privado']),group:z.enum(['area','empresa'])})
]);
export function applyAction(state:State,input:unknown){const a=actionSchema.parse(input);const signal=(person:string,type:string,text:string)=>state.signals.push({id:crypto.randomUUID(),pessoa:person,tipo:type,frase:text});
 if(a.action==='recognize'||a.action==='dismiss'){if(!state.people[a.person])throw new Error('Pessoa não encontrada.');state.signals=state.signals.filter(s=>s.pessoa!==a.person);if(a.action==='dismiss')state.dismissed++;else{state.feed.unshift({id:crypto.randomUUID(),para:a.person,texto:a.text,modo:a.visibility,grupo:a.group,createdAt:new Date().toISOString()});state.people[a.person].dias=0;}return state;}
 const card=state.cards.find(c=>c.id===a.id);if(!card)throw new Error('Card não encontrado.');
 if(a.action==='reference'){if(!(card.done??card.fase===state.stages.length-1))throw new Error('Conclua a atividade antes de marcar como referência.');if(!card.modelo){card.modelo=true;if(card.dono)signal(card.dono,'referencia',`A entrega “${card.t}” foi marcada como referência.`);}return state;}
 if(state.source==='jira')throw new Error('Movimente esta atividade no Jira e sincronize novamente.');
 if(card.fase>=state.stages.length-1)return state;
 if(a.helpers.some(p=>!state.people[p]||p===card.dono)||new Set(a.helpers).size!==a.helpers.length)throw new Error('Selecione colaboradores válidos.');
 if(card.fase===1){if(!a.assessment)throw new Error('Informe a avaliação do review.');card.aval=a.assessment;}
 card.fase++;
 if(card.fase===state.stages.length-1){card.ajuda=a.helpers;state.people[card.dono].entregas++;signal(card.dono,'conclusao',`Concluiu “${card.t}”.`);if(state.types[card.tipo].compl==='alta')signal(card.dono,'complexa',`Concluiu a atividade de alta complexidade “${card.t}”.`);if(card.aval==='acima')signal(card.dono,'acima',`A entrega “${card.t}” foi avaliada acima do esperado.`);if(card.estreia)signal(card.dono,'estreia',`Concluiu seu primeiro trabalho desse tipo: “${card.t}”.`);for(const p of card.ajuda)signal(p,'ajuda',`Ajudou ${state.people[card.dono].nome} em “${card.t}”.`);}
 return state;
}
