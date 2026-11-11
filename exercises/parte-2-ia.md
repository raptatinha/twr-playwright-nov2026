# Exercícios · Parte 2: Playwright e IA

Faça a Parte 1 primeiro. Você precisa saber revisar o que a IA gera.
Os prompts de referência estão em `ia/prompts.md`.

## Aprender

1. Peça para a IA explicar o `playwright.config.ts` deste projeto. Confira 3 respostas na documentação oficial.
2. Pergunte a diferença entre `toBeVisible()` e `isVisible()`. Peça um exemplo no demoqa e rode o exemplo.
3. Quebre um teste, cole o erro na IA e peça só a explicação (sem reescrever o teste).

## Gerar testes

4. Use o prompt **ruim** ("Crie testes para https://demoqa.com/books") e depois o prompt **bom** do `ia/prompts.md`. Compare os dois resultados com o checklist de revisão.
5. Peça um teste para o exercício 4 da Parte 1 seguindo o `AGENTS.md`. O agente usou o Page Object, a fixture e `tests/data`?
6. Remova uma regra do `AGENTS.md` (por exemplo, a dos dados em `tests/data`) e peça o mesmo teste. O que mudou?

## CLI

7. Instale o `playwright-cli` e abra a loja com `--headed`. Use `find`, `click` e `generate-locator` no botão **Next**.
8. Peça ao agente para explorar a paginação com o `playwright-cli` e escrever o teste do exercício 6 da Parte 1.

## MCP

9. Com o `.mcp.json` deste projeto, peça ao agente para descobrir o que acontece no login com campos vazios (exercício 9 da Parte 1).
10. Faça o mesmo pedido com a CLI. Qual resposta foi mais rápida? Qual usou mais contexto?
