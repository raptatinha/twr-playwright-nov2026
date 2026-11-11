// Repare: o import vem das nossas fixtures, não de '@playwright/test'.
import { test } from '../fixtures';
import bookData from './data/book-data';

/**
 * 07 · Page Object + fixture
 * É assim que pedimos para a IA escrever testes (veja AGENTS.md):
 * locators e verificações no Page Object, Page Object via fixture,
 * passos com nome, dados em tests/data, um tag por teste.
 */
const book = bookData.gitPocketGuide;

test.describe('E2E: Book Store', () => {
  test('buscar e abrir um livro', { tag: '@smoke' }, async ({ booksPage }) => {
    // A fixture já abriu a loja antes de chegar aqui.
    await test.step('Quando busco pelo título', async () => {
      await booksPage.search(book.title);
      await booksPage.checkBooksListed([book.title]);
    });

    await test.step('E abro o livro', async () => {
      await booksPage.openBook(book.title);
    });

    await test.step('Então vejo os detalhes e consigo voltar', async () => {
      await booksPage.checkBookDetails(book);
      await booksPage.backToStore();
      await booksPage.checkIsOnStore();
    });
  });
});

test.describe('E2E: Book Store com busca inicial', () => {
  // Muda a opção da fixture só para este describe: a loja já abre buscando "Git".
  test.use({ initialSearch: 'Git' });

  test('a loja abre com a busca aplicada', { tag: '@regression' }, async ({ booksPage }) => {
    await booksPage.checkBookCount(1);
    await booksPage.checkBooksListed([book.title]);
  });
});

/**
 * O que acontece quando este teste roda:
 * 1. O teste pede `booksPage` nos parâmetros, então o Playwright chama a fixture.
 * 2. A fixture cria o BooksPage, abre a loja e (se tiver) faz a busca inicial.
 * 3. A fixture chega no `use(booksPage)` e entrega o Page Object para o teste.
 * 4. O teste roda todos os passos.
 * 5. Quando o teste termina (passando ou falhando), a fixture continua
 *    depois do `use` e anexa o screenshot ao relatório.
 * 6. test.use({ initialSearch: 'Git' }) muda a opção para todos os testes
 *    daquele describe (ou do arquivo, se estiver fora de um describe).
 */
