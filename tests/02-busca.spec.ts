import { test, expect } from '@playwright/test';
import pages from '../utils/pages';
import bookData from './data/book-data';

/**
 * 02 · Busca
 * Locators que um usuário "enxerga" (placeholder, role, nome) e asserts que esperam sozinhos.
 * Os dados (termos e quantidades) ficam em tests/data/book-data.ts.
 */
test.describe('Busca de livros', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pages.books);
  });

  test('buscar pelo título mostra só aquele livro', async ({ page }) => {
    const title = bookData.gitPocketGuide.title;
    await page.getByPlaceholder('Type to search').fill(title);

    // toHaveCount espera a tabela atualizar. Nada de sleep.
    const links = page.getByRole('table').getByRole('link');
    await expect(links).toHaveCount(1);
    await expect(links).toHaveText([title]);
  });

  test('buscar algo que não existe deixa a tabela vazia', async ({ page }) => {
    await page.getByPlaceholder('Type to search').fill(bookData.notFoundSearch);

    await expect(page.getByRole('table').getByRole('link')).toHaveCount(0);
  });

  // Mesmo teste, dados diferentes: um teste para cada linha da lista.
  for (const { term, count } of bookData.searches) {
    test(`buscar "${term}" mostra ${count} livro(s)`, async ({ page }) => {
      await page.getByPlaceholder('Type to search').fill(term);

      await expect(page.getByRole('table').getByRole('link')).toHaveCount(count);
    });
  }
});
