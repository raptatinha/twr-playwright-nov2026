import { test, expect } from '@playwright/test';
import pages from '../utils/pages';
import messages from '../utils/messages';
import userData from './data/user-data';

/**
 * 04 · Login com dados errados
 * getByRole('textbox', { name }) acha o campo pelo nome acessível, igual a um leitor de tela.
 * (No demoqa, getByLabel('UserName') não acha nada: o label não está ligado ao campo.)
 */
test('login com usuário inexistente mostra mensagem de erro', async ({ page }) => {
  await page.goto(pages.login);

  await page.getByRole('textbox', { name: 'UserName' }).fill(userData.invalidUsername);
  await page.getByRole('textbox', { name: 'Password' }).fill(userData.invalidPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(messages.login.invalid)).toBeVisible();
});
