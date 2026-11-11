import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para a aula.
 * Documentação: https://playwright.dev/docs/test-configuration
 *
 * Playground: https://demoqa.com/books (Book Store da ToolsQA)
 *
 * As linhas comentadas são alternativas: descomente para experimentar.
 */

/**
 * Variáveis de ambiente de um arquivo .env (usuário, senha, URL por ambiente).
 * Precisa de: npm install -D dotenv
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  /* Onde ficam os testes. Só arquivos *.spec.ts dentro desta pasta rodam. */
  testDir: './tests',

  /* Pasta dos arquivos gerados: screenshots, vídeos, traces (padrão: test-results). */
  // outputDir: 'test-results/',

  /* Tempo máximo de cada teste (padrão: 30 s). https://playwright.dev/docs/test-timeouts */
  timeout: 30_000,

  /* Tempo máximo de cada expect() que espera algo aparecer (padrão: 5 s). */
  expect: { timeout: 10_000 },

  /* Roda os testes de um mesmo arquivo em paralelo. */
  fullyParallel: true,

  /* No CI, falha se alguém esqueceu um test.only no código. */
  forbidOnly: !!process.env.CI,

  /* Tenta de novo quando falha: 2 vezes no CI, nenhuma na sua máquina. */
  retries: process.env.CI ? 2 : 0,
  // retries: 2, // sempre tenta de novo

  /* Quantos testes ao mesmo tempo. undefined = metade dos núcleos da CPU. */
  workers: process.env.CI ? 1 : undefined,

  /* Relatórios. https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never' }]],
  // reporter: 'html',                                    // padrão
  // reporter: [['html', { open: 'always' }]],            // 'always', 'never' ou 'on-failure' (padrão)
  // reporter: [['html', { outputFolder: 'meu-relatorio' }]],
  // reporter: 'dot',                                     // um ponto por teste (bom para o CI)
  // reporter: 'line',
  // reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
  // reporter: [['junit', { outputFile: 'results.xml' }]], // para ferramentas de CI
  // Relatório próprio: https://playwright.dev/docs/test-reporters#custom-reporters

  /* Opções que valem para todos os testes. https://playwright.dev/docs/api/class-testoptions */
  use: {
    /* Com baseURL, page.goto('/books') vira https://demoqa.com/books */
    baseURL: 'https://demoqa.com',
    // baseURL: process.env.BASE_URL ?? 'https://demoqa.com', // URL por ambiente, vinda do .env

    /* Trace = "gravação" do teste: ações, DOM, rede e console.
       Na aula usamos 'on' para todo teste ter trace.
       No dia a dia, prefira 'on-first-retry' (só grava quando tenta de novo). */
    trace: 'on',
    // trace: 'on-first-retry',
    // trace: 'retain-on-failure',

    /* Screenshot e vídeo só quando o teste falha. */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // video: 'on-first-retry',

    // headless: false,                          // mostra a janela (o mesmo que --headed)
    // viewport: { width: 1280, height: 720 },   // tamanho da janela
    // ignoreHTTPSErrors: true,                  // aceita certificado inválido (ambientes de teste)
    // locale: 'pt-BR',
    // timezoneId: 'America/Sao_Paulo',
  },

  /* Projetos = navegadores. O mesmo teste roda em cada um.
     Para rodar só um: npx playwright test --project=chromium */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    /* Celular:
    { name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 15'] } },
    */

    /* Navegadores instalados na máquina (canal):
    { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    */

    /* Um projeto por ambiente, cada um com sua URL:
    { name: 'staging', use: { ...devices['Desktop Chrome'], baseURL: 'https://staging.meuapp.com' } },
    */
  ],

  /* Sobe o seu app antes dos testes (quando o app é seu e roda localmente). */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
