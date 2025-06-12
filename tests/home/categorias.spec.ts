import { test, expect } from '@playwright/test';

test('Home - navegación por categorías y validación de selección', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.waitForLoadState('networkidle');

  const categoriasTexto = [
    'Retroexcavadora',
    'Excavadora',
    'Cargador Frontal',
    'Tractor de Orugas'
  ];

  for (const nombre of categoriasTexto) {
    const categoria = page.locator('div').filter({ hasText: new RegExp(`^${nombre}$`)}).nth(1);
    await expect(categoria, `Categoría "${nombre}" no visible`).toBeVisible({ timeout: 10000 });
    await categoria.click();
  }

  const categoriasIcono = [
    'Motoniveladora',
    'Rodillos de Suelo',
    'Minicargadores'
  ];

  for (const nombre of categoriasIcono) {
    const item = page.getByRole('listitem').filter({ hasText: nombre });
    const icono = item.getByRole('img');
    await expect(icono, `Icono de "${nombre}" no visible`).toBeVisible({ timeout: 10000 });
    await icono.click();
  }
});
