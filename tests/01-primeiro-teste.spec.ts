import { test, expect } from '@playwright/test';
import pages from '../utils/pages';
import bookData from './data/book-data';

/**
 * 01 · Primeiro teste
 * A estrutura de todo teste: abrir a página (Arrange), agir (Act), verificar (Assert).
 */
test('a loja mostra a tabela de livros', { tag: '@smoke' }, async ({ page }) => {
  // Arrange: abre a página. pages.books = '/books', somado ao baseURL do playwright.config.ts
  await page.goto(pages.books);

  // Assert: o campo de busca e a tabela estão na tela
  await expect(page.getByPlaceholder('Type to search')).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();

  // Assert: o livro "Git Pocket Guide" aparece como link
  await expect(page.getByRole('link', { name: bookData.gitPocketGuide.title })).toBeVisible();
});
