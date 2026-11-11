# Aula Playwright · Novembro 2026

Olá! 👋🏽

Exemplos da aula de Playwright de [Renata Andrade](https://testingwithrenata.com/), usando a
[Book Store do demoqa.com](https://demoqa.com/books) como playground.

## Dependências

Versões usadas na aula:

- Playwright v1.65.0
- Node v24.4.1
- npm v11.4.2
- VS Code 1.145.2

> Pré-requisitos:
- [Node.js](https://nodejs.org/en/download) (v20 ou mais novo)
- [VS Code](https://code.visualstudio.com/learn/get-started/basics)
- Extensão [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) (opcional, ajuda muito)

## Instalar

No terminal, dentro desta pasta:

1. `npm install`
2. `npx playwright install` (baixa os navegadores, só na primeira vez)

## Rodar

| Comando | O que faz |
|---|---|
| `npm test` | todos os testes, nos 3 navegadores |
| `npm run test:chromium` | só no Chromium (mais rápido) |
| `npm run test:smoke` | só os testes com tag `@smoke` |
| `npm run test:api` | só os testes de API (tag `@api`) |
| `npm run test:headed` | mostra a janela do navegador |
| `npm run test:dev` | Chromium, com janela, sem retry, saída curta: bom enquanto você escreve o teste |
| `npm run test:ui` | modo UI: escolha, rode e assista os testes |
| `npm run test:debug` | passo a passo, com o Inspector |
| `npm run test:shard` | só a primeira metade dos testes (no CI, cada máquina roda uma parte) |
| `npm run report` | abre o relatório HTML |
| `npm run codegen` | grava suas ações no navegador e gera o código |

Abrir um trace: `npx playwright show-trace test-results/<pasta-do-teste>/trace.zip`

## O que tem aqui

| Pasta ou arquivo | Assunto |
|---|---|
| `playwright.config.ts` | Configuração comentada, com alternativas para experimentar |
| `tests/template.spec.ts` | Modelo de teste: todos os hooks, `testInfo`, `test.step`, anotações |
| `tests/01-primeiro-teste.spec.ts` | Estrutura de um teste: abrir, agir, verificar |
| `tests/02-busca.spec.ts` | `beforeEach`, locators, `toHaveCount`, teste com lista de dados |
| `tests/03-detalhes-do-livro.spec.ts` | `test.step` e `toHaveURL` |
| `tests/04-login.spec.ts` | Formulário e mensagem de erro |
| `tests/05-api.spec.ts` | Teste de API com a fixture `request` |
| `tests/06-mock-de-rede.spec.ts` | `page.route` para fingir a resposta da API |
| `tests/07-page-object.spec.ts` | Page Object + fixture com setup, teardown e opção |
| `tests/data/` | Dados dos testes (livros, usuários) |
| `utils/` | Caminhos das páginas e da API, mensagens da aplicação |
| `pages/` | Page Objects |
| `fixtures/` | Fixtures (o Playwright entrega o Page Object pronto para o teste) |
| `exercises/` | Exercícios da Parte 1 (fundamentos) e da Parte 2 (IA) |
| `extra-resources/` | Links da documentação, cursos e ferramentas |
| `AGENTS.md`, `CLAUDE.md` | Regras (guardrails) para agentes de IA |
| `.mcp.json` | Playwright MCP configurado para este projeto |
| `ia/prompts.md` | Os prompts da parte de IA |
| `slides/` | A apresentação da aula (abra no navegador) |

___

💡 Compartilhe no LinkedIn algo que você aprendeu e me marque: [Renata Andrade](https://www.linkedin.com/in/raptatinha/).

Happy Testing 🎭
