import { test, expect } from '@playwright/test';

test('Home - navegación por categorías y validación de selección', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.locator('div').filter({ hasText: /^Retroexcavadora$/ }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Excavadora$/ }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Cargador Frontal$/ }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Tractor de Orugas$/ }).nth(1).click();
  await page.getByRole('listitem').filter({ hasText: 'Motoniveladora' }).getByRole('img').click();
  await page.getByRole('listitem').filter({ hasText: 'Rodillos de Suelo' }).getByRole('img').click();
  await page.getByRole('listitem').filter({ hasText: 'Minicargadores' }).getByRole('img').click();
});
