import { test, expect } from '@playwright/test';
import pages from '../utils/pages';
import bookData from './data/book-data';

/**
 * 03 · Detalhes do livro
 * test.step() organiza o teste em passos com nome. Eles aparecem no relatório e no trace.
 */
const book = bookData.gitPocketGuide;

test('abrir um livro e voltar para a loja', async ({ page }) => {
  await test.step('Dado que estou na loja', async () => {
    await page.goto(pages.books);
  });

  await test.step(`Quando clico no livro "${book.title}"`, async () => {
    await page.getByRole('link', { name: book.title }).click();
  });

  await test.step('Então vejo os detalhes do livro', async () => {
    // A URL muda para ?search=<ISBN>
    await expect(page).toHaveURL(new RegExp(`search=${book.isbn}`));
    await expect(page.getByText(book.author)).toBeVisible();
    await expect(page.getByText(book.subTitle)).toBeVisible();
  });

  await test.step('E consigo voltar para a lista', async () => {
    await page.getByRole('button', { name: 'Back To Book Store' }).click();
    await expect(page.getByPlaceholder('Type to search')).toBeVisible();
  });
});
