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
      await page.waitForLoadState('networkidle');  

      const iconoCategoria = page.getByRole('img', { name: 'icon' }).nth(1);
      await expect(iconoCategoria, 'Icono de categoría no visible').toBeVisible({ timeout: 10000 });
      await iconoCategoria.click();

      const headingCategoria = page.getByRole('heading', { name: 'Excavadora', exact: true });
      await expect(headingCategoria).toBeVisible({ timeout: 10000 });

      if (pagina === 2) {
        await page.getByText('2', { exact: true }).click();
        await expect(page).toHaveURL('http://localhost:3000/home');
        await expect(headingCategoria).toBeVisible({ timeout: 10000 });
      }

      const imagen = page.getByRole('img', { name: 'Imagen del producto' , exact: true }).nth(index);
      await expect(imagen, 'Imagen del producto no visible').toBeVisible({ timeout: 15000 });
      await imagen.click();

      const nombreCodificado = encodeURIComponent(nombre);
      await expect(page).toHaveURL(`http://localhost:3000/product/${nombreCodificado}`);

      await expect(page.getByRole('img', { name: 'Imagen principal', exact: true }), 'Imagen principal no visible').toBeVisible({ timeout: 10000 });
      
      const titulo = new RegExp(`John Deere[\\s\\S]*${nombre}`);
      await expect(page.getByRole('heading', { level: 1, name: titulo }),'Heading principal del producto no visible').toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' }),'Heading de Especificaciones no visible').toBeVisible({ timeout: 10000 });

      await page.getByText('Volver atrás').first().click();
      await expect(headingCategoria, 'No volvió a la vista de categoría').toBeVisible({ timeout: 10000 });
    });
  }
});
