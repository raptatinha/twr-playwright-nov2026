# Exercícios · Parte 1: Fundamentos

Playground: https://demoqa.com/books

Antes de escrever cada teste, **explore a página** (navegador, `npm run codegen` ou o modo UI).
Sem respostas aqui: compare a sua solução com os testes da pasta `tests/`.

## playwright.config.ts

1. Rode os testes só no WebKit. Depois descomente o projeto `Mobile Safari` e rode de novo.
2. Troque o `reporter` para `dot` e depois para `[['html', { open: 'always' }]]`. O que muda?
3. Mude `trace` para `'retain-on-failure'`. Rode um teste que passa e um que falha: quando o trace é gerado?

## Estrutura de um teste

4. Escreva um teste: buscar pelo autor **"Addy Osmani"** mostra 1 livro.
5. Escreva um teste: abrir **"Speaking JavaScript"** mostra o autor **Axel Rauschmayer**.
6. Na loja, os botões **Previous** e **Next** estão desabilitados? Escreva o teste.
7. Copie o `tests/template.spec.ts` e crie um teste com `test.step` para "buscar, abrir e voltar".
8. Coloque os dados dos exercícios 4 e 5 em `tests/data/book-data.ts` e use nos testes.

## Login

9. Tente entrar com os campos vazios. O que a página faz? Escreva um teste para isso.
10. Crie `pages/login-page.ts` no mesmo formato do `pages/books-page.ts` (locators, ações e verificações `check...`).

## API e rede

11. Faça um GET em `/BookStore/v1/Book` com um ISBN que não existe. Qual o status? E a resposta?
12. Use `page.route()` para a API devolver uma lista **vazia**. O que a tabela mostra?
13. Use `page.route()` para a API devolver **erro 500**. O que o usuário vê?

## Relatório e trace

14. Quebre um teste de propósito (mude um texto esperado). Abra o relatório e ache a causa só olhando o trace.
15. No trace do teste 07, ache o anexo `tela-final`. De onde ele vem? (Dica: `fixtures/index.ts`.)

## Fixtures

16. Crie uma fixture `loginPage` para o Page Object do exercício 10.
17. Use `test.use({ initialSearch: 'JavaScript' })` num describe novo e verifique que a loja abre com 4 livros.
