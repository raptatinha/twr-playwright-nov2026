import { test as base } from '@playwright/test';
import BooksPage from '../pages/books-page';

/**
 * Fixtures: o Playwright cria o Page Object e entrega pronto para o teste.
 * No teste você escreve `async ({ booksPage }) => ...` em vez de `new BooksPage(page)`.
 */

/* Opção: um valor que cada arquivo ou describe pode mudar com test.use(). */
type Options = {
  initialSearch: string;
};

type Fixtures = {
  booksPage: BooksPage;
};

export const test = base.extend<Options & Fixtures>({
  // [valor padrão, { option: true }] permite mudar com test.use() ou no playwright.config.ts
  initialSearch: ['', { option: true }],

  booksPage: async ({ page, initialSearch }, use, testInfo) => {
    // 1 · ANTES do teste (setup): cria o Page Object e abre a loja
    const booksPage = new BooksPage(page);
    await booksPage.goto();
    if (initialSearch) {
      await booksPage.search(initialSearch);
    }

    // 2 · Entrega para o teste. O teste roda aqui.
    await use(booksPage);

    // 3 · DEPOIS do teste (teardown): roda mesmo se o teste falhar.
    //     Aqui anexamos um screenshot da tela final ao relatório.
    //     Num app real: apagar os dados que o teste criou (via API).
    await testInfo.attach('tela-final', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  },
});

export { expect } from '@playwright/test';
