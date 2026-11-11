import { test, expect } from '@playwright/test';
import apiPaths from '../utils/api-paths';
import bookData from './data/book-data';

/**
 * 05 · API
 * O Playwright também testa APIs, sem abrir navegador: fixture `request`.
 * Documentação da API: https://demoqa.com/swagger
 */
test('GET /BookStore/v1/Books devolve a lista de livros', { tag: '@api' }, async ({ request }) => {
  const response = await request.get(apiPaths.books);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.books.length).toBeGreaterThan(0);

  // Todo livro tem ISBN, título e autor
  for (const book of body.books) {
    expect(book).toEqual(
      expect.objectContaining({
        isbn: expect.any(String),
        title: expect.any(String),
        author: expect.any(String),
      }),
    );
  }
});

test('GET de um livro pelo ISBN', { tag: '@api' }, async ({ request }) => {
  const book = bookData.gitPocketGuide;
  const response = await request.get(apiPaths.book, {
    params: { ISBN: book.isbn },
  });

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({ title: book.title, author: book.author });
});
