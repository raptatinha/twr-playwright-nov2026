# Prompts da aula: Playwright + IA

Playground: https://demoqa.com/books

> Regra zero: pratique sem IA primeiro. A IA acelera quem já sabe o que está olhando.
> Se você não sabe dizer se o teste gerado está certo, ainda é cedo para pedir que ela escreva por você.

---

## 1. Usar IA para APRENDER Playwright

A IA como professora particular: explica, compara, cria exercícios. Você escreve o código.

### Explicar código que você já tem

```
Sou iniciante em Playwright. Explique este playwright.config.ts linha por linha,
em português, dizendo o que acontece se eu mudar cada opção.
Quando citar uma opção, inclua o link da documentação oficial (playwright.dev).

<cole o playwright.config.ts aqui>
```

### Entender a diferença entre dois conceitos

```
Qual a diferença entre `await expect(locator).toBeVisible()` e
`expect(await locator.isVisible()).toBe(true)` no Playwright?
Mostre um exemplo em https://demoqa.com/books onde o segundo falha e o primeiro passa.
```

### Entender um erro

```
Meu teste falhou com o erro abaixo. Explique o que significa, quais são as 3 causas
mais prováveis e como eu investigo cada uma com o trace viewer.
Não reescreva o teste, quero entender primeiro.

<cole o erro completo aqui>
```

### Pedir exercícios

```
Crie 5 exercícios de Playwright, do mais fácil ao mais difícil, usando https://demoqa.com/books.
Para cada um: o objetivo, uma dica, e o que o teste deve verificar.
Não mostre a resposta. Eu vou mandar minha solução para você corrigir.
```

### Cuidados

- A IA pode inventar APIs que não existem ou usar versões antigas. Confira em https://playwright.dev/docs.
- Pergunte "qual versão do Playwright você está considerando?" e diga a sua (`npx playwright --version`).
- Peça sempre o link da documentação junto com a resposta.

---

## 2. Usar IA para GERAR testes

### Prompt ruim

```
Crie testes para https://demoqa.com/books
```

Resultado típico: seletores inventados (`#searchBox`, `.rt-tbody`), `waitForTimeout(3000)`,
asserts fracos (`expect(true).toBeTruthy()`), tudo num arquivo só, sem rodar.

### Prompt bom (contexto + cenário + regras + verificação)

```
Contexto: projeto Playwright + TypeScript. As regras estão no AGENTS.md (leia antes).
Página: https://demoqa.com/books

Cenário:
- Dado que estou na loja
- Quando busco por "JavaScript"
- Então a tabela mostra só livros com "JavaScript" no título, autor ou editora

Regras:
- Explore a página antes (playwright-cli) e use só locators que aparecem no snapshot.
- Use o Page Object pages/books-page.ts e a fixture de fixtures/index.ts.
- Dados (termos, quantidades) em tests/data/book-data.ts, não no teste.
- Sem waitForTimeout. Asserts com expect(...).toHaveCount / toHaveText.

Verificação:
- Rode `npx playwright test tests/<arquivo> --project=chromium` e só termine com o teste passando.
- No fim, me diga o que você criou e uma nota de confiança de 1 a 10.
```

### Revisar o que a IA gerou (checklist)

- [ ] Os locators existem de verdade? Abra o trace e confira.
- [ ] Tem algum `waitForTimeout`, XPath ou CSS do tipo `div > div:nth-child(3)`?
- [ ] O teste falha quando deveria? Quebre a página de propósito (ex.: mude o texto esperado) e veja ficar vermelho.
- [ ] Os asserts verificam o comportamento, e não só "a página abriu"?

---

## 3. Playwright em agentes de código: CLI

Instalação:

```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills      # ensina o agente a usar a CLI (instala a skill)
```

O agente roda comandos no terminal:

```bash
playwright-cli open https://demoqa.com/books
playwright-cli find "Git Pocket"           # procura no snapshot
playwright-cli fill "getByRole('textbox', { name: 'Type to search' })" "Git"
playwright-cli click e146                  # ref que veio do snapshot
playwright-cli generate-locator e263       # -> getByRole('button', { name: 'Back To Book Store' })
playwright-cli close
```

Prompt:

```
Use o playwright-cli para abrir https://demoqa.com/books e explorar a busca.
Liste os elementos que você encontrou (com o locator que o generate-locator sugere).
Depois crie tests/08-busca-por-autor.spec.ts seguindo o AGENTS.md e rode o teste.
```

Para ver o que o agente está fazendo: `playwright-cli show` (painel com as sessões abertas).

---

## 4. Playwright em agentes com MCP

Instalação no Claude Code:

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Ou por projeto, no arquivo `.mcp.json` (já está neste repositório):

```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp@latest", "--isolated"] }
  }
}
```

O agente chama ferramentas (tools) em vez de comandos:
`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_fill_form`,
`browser_take_screenshot`, `browser_network_requests`, `browser_generate_locator`...

Prompt:

```
Usando o Playwright MCP, navegue até https://demoqa.com/login, tente entrar com
usuário "aluno-que-nao-existe" e senha "Senha@123" e me diga exatamente qual mensagem aparece.
Depois escreva um teste que verifica essa mensagem, seguindo o AGENTS.md.
```

### Playwright Test Agents (planner, generator, healer)

```bash
npx playwright init-agents --loop=claude
```

Cria em `.claude/agents/`:

- **planner**: navega no app e escreve um plano de testes em Markdown (`specs/`).
- **generator**: transforma o plano em arquivos `.spec.ts`, conferindo os locators ao vivo.
- **healer**: roda os testes que falham, investiga e propõe a correção.

Também cria `tests/seed.spec.ts` (o ponto de partida que os agentes usam) e um servidor MCP
`playwright-test` no `.mcp.json`.

---

## Guardrails (as regras que eu uso)

- `AGENTS.md` / `CLAUDE.md`: a "constituição" do projeto (DEVE / NUNCA).
- Skills: instruções detalhadas por assunto (page objects, seletores, API, debugging), carregadas sob demanda.
- Hooks: scripts que **bloqueiam** a edição quando a regra é quebrada (ex.: `waitForTimeout`).
- Base pronta: https://github.com/idavidov13/agentic-playwright

```bash
npm create agentic-playwright@latest . -- --demo
```
