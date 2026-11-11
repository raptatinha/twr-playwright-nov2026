# Regras para agentes de IA neste projeto

Este arquivo é lido automaticamente por Codex, Cursor e GitHub Copilot.
O Claude Code lê através do `CLAUDE.md`, que importa este arquivo.

Versão reduzida, para a aula, das regras do projeto Testing With Renata, que por sua vez
vieram do [agentic-playwright](https://github.com/idavidov13/agentic-playwright) (Ivan Davidov, MIT).

## Papel

Você escreve testes Playwright + TypeScript para https://demoqa.com/books.
O público é iniciante: código simples, comentários curtos em português.

## Fluxo obrigatório

1. **Explore antes de gerar.** Abra a página com `playwright-cli` (ou Playwright MCP) e leia o snapshot.
   Nunca invente um locator: se você não viu o elemento no snapshot, ele não existe.
2. **Planeje.** Antes de editar, diga o que vai criar, em quais arquivos, e dê uma nota de confiança de 1 a 10.
   Se a nota for menor que 5, **pergunte** em vez de chutar.
3. **Gere** seguindo as regras abaixo.
4. **Rode** os testes que você criou: `npx playwright test <arquivo> --project=chromium`.
   Só diga "pronto" com os testes passando.

## DEVE

| Regra | Como |
|---|---|
| Locators na ordem | `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTestId` |
| Asserts que esperam | `await expect(locator).toBeVisible()`, `toHaveText`, `toHaveCount`, `toHaveURL` |
| Page Objects | Em `pages/`: `readonly page: Page`, locators no constructor, ações (`search`, `openBook`) e verificações (`checkBookCount`). Os testes recebem o Page Object por fixture |
| Textos e dados fora do teste | Caminhos em `utils/pages.ts` e `utils/api-paths.ts`, mensagens da aplicação em `utils/messages.ts`, dados em `tests/data/` |
| Novo teste | Comece copiando `tests/template.spec.ts` |
| Import das fixtures | Em testes de UI novos: `import { test, expect } from '../fixtures'` |
| Passos com nome | `test.step('Dado que...')`, `'Quando...'`, `'Então...'` |
| Um tag por teste | `{ tag: '@smoke' }`, `@regression` ou `@api` (os scripts `test:smoke` e `test:api` filtram por eles). Nunca no `test.describe` |
| Prefixo no describe | `'E2E: ...'` ou `'API: ...'` |

## NUNCA

- `page.waitForTimeout(...)` ou qualquer "sleep".
- XPath (`//div[2]/span`) ou CSS frágil (`.col-md-6 > div:nth-child(3)`).
- `new BooksPage(page)` dentro de um teste: use a fixture.
- Senhas ou tokens no código: use `process.env`.
- Texto da aplicação, URL ou dado de teste escrito direto no teste.
- `page` ou `context` dentro de `beforeAll` / `afterAll` (dá erro: eles são criados por teste).
- `test.skip` para esconder teste quebrado. Se falhou, descubra por quê.
- Aumentar timeout para "resolver" teste instável.

## Quando parar e perguntar

- A página não carregou ou o elemento não aparece no snapshot.
- Você não sabe o texto exato de uma mensagem.
- Existem dois jeitos razoáveis de fazer e a escolha muda o projeto.
