import { type Locator, type Page, expect } from '@playwright/test';
import pages from '../utils/pages';

/**
 * Page Object da loja (https://demoqa.com/books).
 * - Locators: definidos uma vez no constructor.
 * - Ações: o que o usuário faz (buscar, abrir um livro).
 * - Verificações (check...): o que o usuário deve ver.
 * Se a tela mudar, você muda aqui, não em 20 testes.
 */
export class BooksPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly bookLinks: Locator;
  readonly backToStoreButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByPlaceholder('Type to search');
    this.bookLinks = page.getByRole('table').getByRole('link');
    this.backToStoreButton = page.getByRole('button', { name: 'Back To Book Store' });
  }

  async goto() {
    await this.page.goto(pages.books);
    await expect(this.searchBox).toBeVisible();
  }

  async search(term: string) {
    await this.searchBox.fill(term);
  }

  async openBook(title: string) {
    await this.page.getByRole('link', { name: title }).click();
  }

  async backToStore() {
    await this.backToStoreButton.click();
  }

  async checkBookCount(count: number) {
    await expect(this.bookLinks).toHaveCount(count);
  }

  async checkBooksListed(titles: string[]) {
    await expect(this.bookLinks).toHaveText(titles);
  }

  async checkBookDetails(book: { isbn: string; author: string; subTitle: string }) {
    await expect(this.page).toHaveURL(new RegExp(`search=${book.isbn}`));
    await expect(this.page.getByText(book.author)).toBeVisible();
    await expect(this.page.getByText(book.subTitle)).toBeVisible();
  }

  async checkIsOnStore() {
    await expect(this.searchBox).toBeVisible();
  }
}

export default BooksPage;
