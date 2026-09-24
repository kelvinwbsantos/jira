# Notado

Protótipo funcional em **Next.js App Router, React e TypeScript**, baseado em `prototipo-reconhecimento-v2.html`. O HTML original permanece intacto. Frontend e backend no mesmo projeto; SQLite para persistência local.

## Executar

Requer **Node.js 24+** (usa `node:sqlite`) e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Nenhuma credencial é necessária para a demonstração. O banco é criado automaticamente em `.data/notado.sqlite`. Dados de demonstração persistem após recarregar a página. Cada navegador recebe uma sessão isolada por cookie HttpOnly, com duração de 30 dias. Limpar os cookies cria um novo espaço.

```bash
npm test
npm run typecheck
npm run build
npm start
```

## Telas e interações

- **Quadro:** colunas do processo, busca, responsáveis, tipos e sinais. No modo demonstração, avanço com avaliação de review e indicação de ajuda na conclusão; marcar entregas como referência.
- **Reconhecer:** fila de até três pessoas por tempo conhecido sem reconhecimento, dispensa de sugestão e registro de mensagem pública ou particular.
- **Mural:** reconhecimentos públicos da sessão.
- **Pessoas:** lista, perfil, reconhecimentos e entregas concluídas.
- **Como funciona:** ciclo e regras dos sinais.
- **Integração Jira:** OAuth, seleção de site/projeto, sincronização e desconexão.
- Tema claro/escuro, layout responsivo, navegação por teclado e modal nativo.

## Conectar uma empresa ao Jira pela API

**Jira Cloud é a hospedagem do Jira; API é a forma de integração.** Este conector usa a API REST v3 e OAuth 2.0 (3LO). O cliente autoriza sua conta, sem fornecer a senha ao Notado. Jira Data Center tem outra configuração de endereço/autenticação e não está implementado.

1. Cadastre uma aplicação OAuth 2.0 na [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).
2. Configure os escopos `read:jira-work`, `read:jira-user` e `offline_access` e o callback `http://localhost:3000/api/jira/callback`.
3. Copie `.env.example` para `.env.local`. Preencha `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`, `APP_URL` e `TOKEN_ENCRYPTION_KEY` (gere com `openssl rand -hex 32`). Nunca use prefixo `NEXT_PUBLIC_` para segredos.
4. Reinicie o servidor, abra **Integração Jira**, conecte, escolha o site/projeto e sincronize.
5. Para permitir autorização por clientes fora do proprietário da aplicação, configure a distribuição da aplicação na Atlassian conforme as regras da conta e os requisitos vigentes de distribuição. Usar HTTPS e atualizar o callback e `APP_URL` ao hospedar.

A integração consulta projetos com paginação, estados dos tipos de atividade e cards por `POST /rest/api/3/search/jql`. Limite explícito de 5.000 cards por importação; resultados incompletos não são persistidos. Projetos com mais de 10.000 entradas na listagem não são suportados. Apenas dados acessíveis ao usuário autorizador são consultados. Não há escrita de cards no Jira: os links abrem a atividade original, e o botão Sincronizar consulta novamente.

As colunas são os estados do projeto agrupados pelas categorias a fazer / em andamento / concluído. Não reproduzem necessariamente a ordem ou o mapeamento de colunas de um board Jira. Prioridade não é convertida em dificuldade. Pessoas importadas começam sem histórico de reconhecimento; papel não é inferido como cargo. A primeira carga não cria sinais retroativos. Novas conclusões observadas entre sincronizações e referências marcadas no Notado geram sinais. Não há inferência de PR, review, ajuda, estreia ou complexidade a partir de campos não disponíveis.

Access e refresh tokens ficam no servidor, criptografados com AES-256-GCM. A autorização usa `state` de uso único com expiração. Refresh tokens são renovados no servidor. A chave de criptografia deve ser preservada entre reinicializações. Desconectar apaga a conexão e os dados do espaço local, retornando ao modo demonstração; para revogar o consentimento na Atlassian, remova a aplicação nos aplicativos conectados da conta.

## Backend

| Rota | Função |
| --- | --- |
| `GET /api/state` | Sessão, quadro e estado público da conexão (sem tokens) |
| `POST /api/actions` | Avanço em demonstração, referência, dispensa e reconhecimento |
| `GET /api/jira/connect` | Iniciar autorização OAuth |
| `GET /api/jira/callback` | Validar autorização e guardar tokens |
| `GET /api/jira/projects?site=...` | Projetos acessíveis no site autorizado |
| `POST /api/jira/sync` | Importar projeto por site e ID de projeto |
| `POST /api/jira/disconnect` | Remover conexão e restaurar demonstração |

Mutações são validadas com Zod e verificação de Origin. O cliente não escolhe o identificador da sessão/empresa nas requisições. Credenciais não são devolvidas no estado.

## Limites deste protótipo

Este é um **protótipo por sessão, não um SaaS multiempresa pronto para produção**. A sessão isola os dados entre navegadores, mas ainda não representa uma organização com membros. Reconhecimentos são registros locais desse espaço; não são enviados a pessoas. Os rótulos público/particular controlam as telas deste protótipo, não um sistema de autorização entre usuários autenticados. Não há login, convite, RBAC ou entrega de notificações. A interface deixa isso explícito.

Para um piloto com equipes reais: implementar autenticação, organizações, vínculos com contas Atlassian, permissões e controle de acesso a feedbacks no servidor; migrar para banco compartilhado, filas e controle de concorrência; adicionar webhooks, reconciliação, retenção/expiração de sessões e observabilidade. SQLite exige disco persistente e uma instância de aplicação; não usar esta persistência em funções efêmeras/serverless. Reconexão e sincronização manual estão implementadas, não sincronização automática. Os dias sem reconhecimento do conjunto fictício são estáticos; dados reais sem histórico aparecem como desconhecidos.

Ao trocar o projeto importado, o espaço e seus reconhecimentos anteriores são substituídos após confirmação na interface. Esta versão acompanha um projeto por sessão. Não implementa editor de processos, dependências entre setores nem mapeamento de campos customizados.

## Referências

- [Next.js App Router](https://nextjs.org/docs/app)
- [OAuth 2.0 do Jira Cloud](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/)
- [Busca de atividades REST v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/)

## Validação executada

- Compilação de produção (`npm run build`) e checagem TypeScript concluídas.
- 9 testes de domínio/segurança: conclusão e ajuda, idempotência, validação de ações, reconhecimento particular, importação Jira sem fatos inventados, separação entre projetos, criptografia autenticada e proteção de origem.
- 3 testes de navegador Chromium: fluxo de reconhecimento com persistência, isolamento entre sessões e navegação/busca/tema em viewport móvel de 390px.
- OAuth contra uma conta Atlassian real ainda não foi validado, pois as credenciais não foram fornecidas. Testes de importação utilizam respostas de exemplo.

Para repetir os testes de navegador, deixe `npm run dev` em outro terminal e execute:

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

Em Linux, instalar as dependências do Chromium pode exigir acesso de administrador. As capturas geradas pelos testes ficam em `test-results/` (ignorado pelo Git).
