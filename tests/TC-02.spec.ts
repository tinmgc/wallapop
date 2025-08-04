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
  await page.locator('div').filter({ hasText: /^Dirección de e-mail$/ }).click();
  await page.getByRole('textbox', { name: 'Dirección de e-mail' }).fill('qa.test@wallapop.com');
  await page.locator('div').filter({ hasText: /^Contraseña$/ }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('12345678');
  await page.getByRole('button', { name: 'Acceder a Wallapop' }).click();
  await page.getByRole('link', { name: 'Tú' }).click();
  // Access to vacation mode
  await page.getByRole('link', { name: 'Nuevo Modo vacaciones' }).click();
  await expect(page.locator('h1')).toContainText('Modo vacaciones');
  await expect(page.locator('.VacationMode__vacationInformationContainer')).toBeVisible();
  // Activate the vacation mode and select an end date
  await page.locator('wallapop-toggle span').nth(2).click();
  await expect(page.getByRole('dialog', { name: 'Finaliza a las 23:59 del' }).locator('div').nth(2)).toBeVisible();
  await page.getByLabel('Seleccionar mes').selectOption('12');
  await page.getByText('31', { exact: true }).click();
  // Confirm the end date
  await page.getByRole('button', { name: 'Confirmar' }).click();
  // Validate the end date
  await expect(page.getByText('Finaliza elmiércoles, 31 diciembre 2025Cambiar')).toBeVisible();
  await expect(page.getByText('Modo vacaciones activado')).toBeVisible();
  // Disable the vacation mode to be able to re execute the test with the same data set
  await page.locator('wallapop-toggle span').nth(2).click();
});
