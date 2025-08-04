/*
Updated: 04/08/2025
Author: Martín Cesarini
Owner / Maintainer: QA Team
*/
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://es.beta.wallapop.com/');
  await page.getByRole('button', { name: 'Rechazar todo' }).click();
  // In case Google password popup shows
  await page.waitForTimeout(3000); // wait 3 seconds for the popup
  if (await page.locator('iframe[title="Cuadro de diálogo Iniciar sesión con Google"]').contentFrame().getByRole('heading', { name: 'Iniciar sesión con Google' }).isVisible()) {
    await page.locator('iframe[title="Cuadro de diálogo Iniciar sesión con Google"]').contentFrame().getByRole('button', { name: 'Cerrar' }).click();
  }
  // Login
  await page.getByRole('button', { name: 'Regístrate o inicia sesión' }).click();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByText('Dirección de e-mail').click();
  await page.getByRole('textbox', { name: 'Dirección de e-mail' }).fill('qa.test@wallapop.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('12345678');
  await page.getByRole('button', { name: 'Acceder a Wallapop' }).click();
  await page.getByRole('link', { name: 'Tú' }).click();
  // Access to Favorite -> Profile -> User with vacation mode ON
  await page.locator('tsl-sidebar').getByRole('link', { name: 'Favoritos' }).click();
  await page.getByRole('link', { name: 'Perfiles' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Martin M.' }).click();
  const page1 = await page1Promise;
  const page2Promise = page1.waitForEvent('popup');
  // Enter to a product
  await page1.getByRole('link', { name: 'PlayStation 5 Pro - Blanca' }).click();
  const page2 = await page2Promise;
  // Validate the item cannot be purchased
  await expect(page2.getByRole('complementary')).toContainText('Chat');
});
