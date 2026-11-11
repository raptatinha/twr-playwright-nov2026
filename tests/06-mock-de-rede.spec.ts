import { test, expect } from '@playwright/test';
import pages from '../utils/pages';
import apiPaths from '../utils/api-paths';
import bookData from './data/book-data';

/**
 * 06 · Mock de rede
 * page.route() intercepta a chamada da página para a API e devolve o que a gente quiser.
 * Útil para testar casos difíceis de criar de verdade (lista vazia, erro 500, dados específicos).
 */
test('a loja mostra o livro que a API (falsa) devolveu', async ({ page }) => {
  const mockBook = bookData.mockBook;

  await page.route(`**${apiPaths.books}`, async (route) => {
    await route.fulfill({ json: { books: [mockBook] } });
  });

  await page.goto(pages.books);

  await expect(page.getByRole('link', { name: mockBook.title })).toBeVisible();
  await expect(page.getByRole('table').getByRole('link')).toHaveCount(1);
});
