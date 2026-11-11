import { test, expect } from '@playwright/test';
import pages from '../utils/pages';
import bookData from './data/book-data';

/**
 * MODELO DE TESTE: todos os hooks, testInfo, passos e anotações num lugar só.
 * Copie este arquivo para começar um teste novo.
 *
 * Padrão AAA:
 *   [Arrange] preparar  → abrir a página, criar dados
 *   [Act]     agir      → clicar, digitar
 *   [Assert]  verificar → expect(...)
 */

// beforeAll: roda UMA vez antes dos testes deste arquivo (uma vez por worker).
// Só recebe fixtures de worker (browser, browserName, playwright...).
// ATENÇÃO: `page` e `context` NÃO existem aqui, porque são criados por teste.
test.beforeAll(async ({ browserName }) => {
  console.log(`Início do arquivo no ${browserName}`);
  // iniciar um servidor
  // abrir uma conexão com o banco de dados
  // criar dados via API
});

// beforeEach: roda antes de CADA teste. Aqui `page` existe.
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Rodando: ${testInfo.title}`);
  // [Arrange] abrir a URL
  await page.goto(pages.books);
  // limpar dados, criar um Page Object, fechar um modal...
});

// afterEach: roda depois de CADA teste, passando ou falhando.
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Terminou: ${testInfo.title} com status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(`Não terminou como esperado. Parou em ${page.url()}`);
  }
  // apagar via API os dados que este teste criou
});

// afterAll: roda UMA vez depois de todos os testes do arquivo.
// De novo: sem `page` aqui. Usar ({ page }) dá erro.
test.afterAll(async () => {
  console.log('Arquivo concluído.');
  // fechar a conexão com o banco de dados
});

// test.describe.only(...) → roda só este grupo (o CI falha por causa do forbidOnly)
// test.describe.skip(...) → pula este grupo (aparece como "skipped" no relatório)
test.describe('Modelo de teste', () => {
  test('cenário com passos', async ({ page }) => {
    const title = bookData.gitPocketGuide.title;

    await test.step('Quando busco um livro', async () => {
      // [Act]
      await page.getByPlaceholder('Type to search').fill(title);
    });

    await test.step('Então só ele aparece', async () => {
      // [Assert]
      await expect(page.getByRole('table').getByRole('link')).toHaveText([title]);
    });
  });

  test('cenário com AAA em comentários', async ({ page }) => {
    // [Arrange] a página já foi aberta no beforeEach
    // [Act]
    await page.getByPlaceholder('Type to search').fill(bookData.notFoundSearch);
    // [Assert]
    await expect(page.getByRole('table').getByRole('link')).toHaveCount(0);
  });

  test('cenário que não roda em produção', async ({ page }) => {
    // Pular com condição e motivo é diferente de esconder teste quebrado:
    // aqui o teste depende de dados que só existem fora de produção.
    test.skip(!!process.env.PROD, 'Depende de dados que não existem em produção.');

    await expect(page.getByRole('link', { name: bookData.gitPocketGuide.title })).toBeVisible();
  });

  /* Outras anotações (descomente para experimentar):
  test.only('roda só este teste', async ({ page }) => {});
  test.fixme('teste que ainda precisa ser corrigido', async ({ page }) => {});
  test('teste que esperamos que falhe', async ({ page }) => { test.fail(); });
  test('teste lento', async ({ page }) => { test.slow(); }); // triplica o timeout
  */
});
