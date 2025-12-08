# Test Plan - Projeto Cypress (automationexercise)

## Identificação
- Projeto: cypress-pos-unipe-iv (automationexercise)
- Autor: geração automática
- Data: 2025-12-07

## Objetivo
Validar os fluxos críticos do site `https://automationexercise.com` com foco em registro de usuário, pesquisa/adicionar produtos ao carrinho e finalização de compra.

## Escopo
- Testes E2E automatizados para o fluxo de compra (registro, adicionar produto, checkout e pagamento).
- Testes manuais para casos complementares (validações de erros, comportamento responsivo, exclusão de conta).

## Itens fora do escopo
- Testes de API direta (a menos que haja endpoints públicos testados por specs separados).
- Testes de performance e carga.

## Ambiente de Teste
- Navegador: Chrome (ou browser configurado no `cypress`), execuções em headed e headless.
- Node.js e NPM instalados.
- Cypress ^15.x conforme `package.json`.
- baseUrl configurado em `cypress.config.js`.

## Critérios de entrada
- Código do projeto disponível localmente.
- Dependências instaladas (`npm ci` ou `npm install`).

## Critérios de saída / aceitação
- Todos os testes E2E críticos passam em ambiente local e em CI.
- Sem erros de regressão introduzidos.

## Riscos e dependências
- Flakiness devido a carregamento lento do site externo.
- Dependência de ambiente externo (site público) — pode causar falhas intermitentes.

## Estratégia de Teste
- Automatizar testes E2E com Cypress usando Page Objects já presentes no projeto.
- Minimizar waits arbitrários; usar intercept quando possível.
- Manter fixtures para dados reutilizáveis.

## Casos de teste de alto nível
1. Registro de usuário válido (automático) — existente em `01-registro-usuario.spec.cy.js`.
2. Registro com email duplicado — validar mensagem de erro.
3. Fluxo de compra completo (novo spec `05-fluxo-compra.spec.cy.js`).
4. Adicionar e remover itens no carrinho — validar quantidade e preço.
5. Finalização de compra e verificação de mensagem "Order Placed!".

## Critérios de priorização
- Alta: registro, adicionar ao carrinho, checkout e pagamento.
- Média: pesquisas de produto, busca, filtros.
- Baixa: comportamento visual e acessibilidade (na etapa inicial).

## Métricas de sucesso
- % de testes E2E passando (meta > 95% dos testes críticos).
- Tempo médio por execução do suite E2E (meta < 5 minutos em ambiente CI com headless).

## Plano de execução
- Execução local: `npm install` → `npx cypress open` ou `npm run test`.
- Integração contínua: configurar workflow (GitHub Actions) para rodar `npm ci && npm test` em PRs.

## Observações
- Recomenda-se adicionar atributos `data-cy`/`data-qa` nos elementos para estabilizar seletores.

