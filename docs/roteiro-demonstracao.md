# Notado — roteiro de demonstração

**Duração:** 6 a 7 minutos. **Mensagem central:** “O trabalho deixa sinais. O Notado mostra por que olhar para uma contribuição; o reconhecimento continua humano.”

## Preparação

1. Use Node.js 24 ou superior, execute `npm run dev` e abra http://localhost:3000.
2. Para começar do cenário original, abra uma nova janela anônima, sem outra janela anônima aberta. Cada sessão tem seus próprios dados. Não é necessário apagar o banco.
3. Use zoom de 100%, de preferência em uma janela com pelo menos 1280px de largura. A interface também funciona no celular.
4. Confirme o selo **Demonstração**. Não conecte ao Jira para este roteiro: os exemplos já estão prontos e não precisam de credenciais.
5. Ensaie em uma sessão separada. Movimentar cards e registrar reconhecimentos altera e persiste o estado daquela sessão; as simulações da aba Gatilhos podem ser repetidas livremente.

## 1. O problema e a proposta — 0:00 a 0:40

**Tela:** Quadro, bloco de abertura.

**Fala:**
> “Nem toda contribuição aparece na entrega final. Quem ajudou a destravar, quem fez algo pela primeira vez e quem está há muito tempo sem ser reconhecido pode passar despercebido. O Notado usa o contexto do trabalho para lembrar a liderança desses momentos.”

Aponte os totais de sinais e pessoas. São oportunidades de atenção, não indicadores de produtividade.

**Transição:** “Vou mostrar exatamente de onde vem um sinal.”

## 2. O diferencial: gatilhos explicáveis — 0:40 a 1:50

**Cliques:** **Explorar gatilhos** → **Colaboração** (já selecionada).

Aponte os três blocos: **O evento**, **A regra**, **Por que olhar**.

**Fala:**
> “Aqui não aparece só uma recomendação genérica. A gente mostra o evento, a regra que foi aplicada e o motivo para prestar atenção. Neste caso, Beatriz conclui uma atividade e informa que Lara ajudou.”

Clique em **Concluir com ajuda de Lara**. O exemplo retorna três sinais: conclusão e estreia para Beatriz; ajuda para Lara. A colaboração fica destacada.

**Fala:**
> “O mesmo evento revela contribuições diferentes. Lara recebe visibilidade mesmo sem ser a responsável pelo card. O sistema identifica a oportunidade; uma pessoa ainda precisa avaliar o contexto e escrever a mensagem.”

Explique o selo **Simulação isolada**: este exemplo usa as regras do protótipo, mas não altera o quadro nem cria um reconhecimento.

Se houver tempo, selecione **Complexidade** → **Concluir migração**. Explique que a dificuldade vem do tipo de atividade definido no processo, não da prioridade do Jira.

## 3. O fluxo acontecendo no quadro — 1:50 a 3:10

**Cliques:** botão **Abrir quadro →**, abaixo do simulador, ou aba **Quadro**.

1. Busque **Filtro de período**.
2. No card **Filtro de período na listagem de clientes**, de Beatriz, clique em **Avançar →**.
3. No diálogo, selecione **Lara Pontes** e clique em **Marcar como pronta**.
4. Mostre o bloco **3 novos sinais gerados**, acima do quadro.

**Fala:**
> “Agora fizemos a ação no espaço da demonstração. O card foi concluído e os sinais ficaram salvos: uma entrega concluída, uma primeira entrega desse tipo e a ajuda de Lara. A justificativa acompanha cada pessoa.”

A indicação de primeira entrega já está cadastrada neste cenário fictício. Não a apresente como uma inferência automática do Jira.

**Opcional:** no card concluído, clique em **Marcar como referência**. O destaque muda para o novo sinal de referência. Isso mostra uma segunda forma de geração: uma avaliação explícita de alguém do time.

## 4. Do sinal à mensagem — 3:10 a 4:15

**Cliques:** aba **Gatilhos** → seção **Sinais que você pode reconhecer** → filtro **Ajudou um colega** → sinal de **Lara Pontes** → **Reconhecer contribuição →**.

**Fala:**
> “A evidência chega junto da sugestão. Eu não preciso escrever de memória, mas o texto continua sendo meu. Posso explicar o impacto daquela ajuda.”

Digite:
> “Lara, obrigada por apoiar a Beatriz na entrega do filtro de período. Sua colaboração ajudou o time a concluir esse trabalho e tornou essa primeira entrega uma experiência compartilhada.”

Mantenha **Em público** e **Grupo do time**, depois clique em **Salvar reconhecimento**. Abra **Mural** e mostre a mensagem.

**Fala:**
> “A contribuição vira uma história registrada. Também existe a opção de registro particular. Nesta demonstração os dados ficam na sessão; o envio para colegas e a privacidade por usuário dependem da futura autenticação.”

## 5. Quem ficou fora do radar — 4:15 a 4:50

**Cliques:** aba **Reconhecer**. Mostre **Sofia Andrade**, com 97 dias no cenário inicial.

**Fala:**
> “O Notado também chama atenção para quem não foi reconhecido recentemente. A ordem considera o tempo conhecido sem reconhecimento, não uma classificação de mérito. Mostramos até três pessoas por vez para tornar a decisão mais simples.”

Os 97 dias e as sete validações são dados fictícios do exemplo. O contador de ausência não é recalculado diariamente nesta versão, e o período configurável do DRS ainda está previsto.

## 6. Visão do produto e integração — 4:50 a 5:50

**Cliques:** aba **Gatilhos** → **Outros momentos que merecem ser vistos** → abra **Entrega antecipada** e **Evolução do ritmo pessoal**.

**Fala:**
> “O documento de requisitos amplia essa ideia: uma entrega antes do prazo, uma evolução em relação ao próprio histórico, tempo de empresa, aniversário e marcos de projetos. Estas são prévias da experiência, com exemplos e dados necessários. Ainda não são automações conectadas.”

Se perguntarem pelo Jira, abra **Integração Jira**:
> “A integração consulta o Jira em modo de leitura. Nesta versão, novas conclusões são percebidas entre sincronizações manuais; referências são marcadas no Notado. A primeira carga é uma fotografia inicial. Ajuda, qualidade e complexidade precisam de dados adicionais para funcionar com dados reais.”

Não faça OAuth ao vivo sem ter configurado e ensaiado a conexão antes.

## 7. Fechamento — 5:50 a 6:15

**Tela:** volte a **Gatilhos**, no topo.

**Fala:**
> “O diferencial do Notado é transformar acontecimentos do trabalho em oportunidades explicáveis de valorização. Evento, evidência, decisão humana e registro. Sem pontos e sem competição entre colegas.”

## Versão curta — 2 minutos

1. **Quadro:** apresente o problema em uma frase.
2. **Gatilhos:** execute o exemplo de colaboração e aponte os três sinais.
3. Na mesma tela, filtre os sinais da sessão por **Tempo sem reconhecimento** e abra o reconhecimento de Sofia.
4. Escreva uma mensagem curta baseada no contexto, salve em público e mostre o **Mural**.
5. Termine com “O sistema chama atenção; a pessoa dá significado”.

## Se algo sair do previsto

| Situação | Como continuar |
| --- | --- |
| O card já está concluído | Use a simulação de Colaboração, que pode ser repetida, ou abra uma nova sessão anônima para repetir o fluxo completo. |
| Lara não aparece na fila inicial | Abra Gatilhos e filtre por ajuda, ou abra o perfil dela em Pessoas. A fila mostra apenas três pessoas por vez. |
| Um sinal desapareceu após salvar | É o comportamento atual: reconhecer uma pessoa remove todos os sinais pendentes dela. O registro está no Mural se for público. |
| O filtro de ajuda está vazio | Conclua o card de Beatriz indicando Lara. Executar a simulação isolada não preenche a fila da sessão. |
| A conexão Jira não está configurada | Continue em Demonstração. Nenhuma etapa principal depende da Atlassian. |
| O público perguntar sobre login/notificação | Diga que o protótipo persiste registros por sessão. Usuários autenticados, entrega de notificações e permissões ainda são próximos passos. |

## Relação com o DRS fornecido

O PDF foi utilizado como referência de produto. Esta melhoria demonstra a explicabilidade dos gatilhos e o fluxo de reconhecimento; não implementa todo o escopo descrito no documento.

| Referência | O que é demonstrável agora | Limite |
| --- | --- | --- |
| RF-06, RF-24 | Ausência de reconhecimento e priorização da fila | Histórico fictício estático; sem configuração de 30/60/90 dias. |
| RF-07 a RF-11 | Prévias expansíveis com regra, evidência e dados necessários | Sem geração automática nem importação desses históricos. |
| RF-12 | Indicação de até dois colegas na conclusão; sinal individual de ajuda | Funciona no quadro de demonstração; não há campo Jira mapeado. |
| RF-14, RF-16 | Abrir a escrita a partir do sinal, registrar em público ou particular | Registro por sessão; sem identidade de remetente autenticada. |
| RF-17, RF-18, RF-20 | Mural público e histórico no perfil dentro da sessão | Não representam controle de acesso entre funcionários. |
| RF-25, RNF-03, RNF-04 | Evento, regra, justificativa e exemplos explícitos na aba Gatilhos | Evidências disponíveis dependem do gatilho e da fonte. |
| RF-04 | Integração Jira somente leitura | Avançar cards existe apenas no modo de demonstração. |
| RF-13, RF-19, RF-21 | Não implementados nesta melhoria | Identificação do líder, notificações e classificação do reconhecimento continuam previstos. |

Complexidade, qualidade, estreia, referência e conclusão são exemplos que já existiam nas regras do repositório e agora ficam mais visíveis. Eles complementam os gatilhos do DRS.
