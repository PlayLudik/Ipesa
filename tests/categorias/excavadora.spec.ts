import { test, expect } from '@playwright/test';

const productos = [
  { nombre: '130P', index: 0, pagina: 1 },
  { nombre: '160P', index: 1, pagina: 1 },
  { nombre: '200G', index: 2, pagina: 1 },
  { nombre: '210P', index: 3, pagina: 1 },
  { nombre: '250P', index: 4, pagina: 1 },
  { nombre: '350P', index: 5, pagina: 1 },
  { nombre: '470G LC', index: 0, pagina: 2 },
  { nombre: '670G LC', index: 1, pagina: 2 },
  { nombre: '870G LC', index: 2, pagina: 2 }
];

test.describe('Pruebas de productos Excavadora', () => {
  for (const { nombre, index, pagina } of productos) {
    test(nombre, async ({ page }) => {
      await page.goto('http://localhost:3000/home');

      const icon = page.getByRole('img', { name: 'icon' }).nth(1);
      await expect(icon).toBeVisible();
      await icon.click();

      await expect(page.getByRole('heading', { name: 'Excavadora' })).toBeVisible();

      if (pagina === 2) {
        await page.getByText('2', { exact: true }).click();
        await expect(page).toHaveURL('http://localhost:3000/home');
        await expect(page.getByRole('heading', { name: 'Excavadora' })).toBeVisible();
      }

      const imagenProducto = page.getByRole('img', { name: 'Imagen del producto' }).nth(index);
      await expect(imagenProducto).toBeVisible();
      await imagenProducto.click();

      const nombreCodificado = encodeURIComponent(nombre);
      await expect(page).toHaveURL(`http://localhost:3000/product/${nombreCodificado}`);
      await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1, name: new RegExp(`John Deere[\\s\\S]*${nombre}`) })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' })).toBeVisible();

      await page.getByText('Volver atrás').first().click();
      await expect(page.getByRole('heading', { name: 'Excavadora' })).toBeVisible();
    });
  }
});
