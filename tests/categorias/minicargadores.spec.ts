import { test, expect } from '@playwright/test';

const minicargadores = [
  {
    nombre: 'John Deere 320G',
    url: '/product/320G',
    indiceImagen: 0,
  },
  {
    nombre: 'John Deere 324G',
    url: '/product/324G',
    indiceImagen: 1,
  },
  {
    nombre: 'John Deere 325G',
    url: '/product/325G',
    indiceImagen: 2,
  },
];

for (const producto of minicargadores) {
  test(producto.nombre, async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    await page.waitForLoadState('networkidle'); 

    const iconoCategoria = page.getByRole('img', { name: 'icon' }).nth(6);
    await expect(iconoCategoria, 'Icono de categoría no visible').toBeVisible({ timeout: 10000 });
    await iconoCategoria.click();

    const headingCategoria = page.getByRole('heading', { name: 'Minicargadores', exact: true });
    await expect(headingCategoria).toBeVisible({ timeout: 10000 });

    const imagen = page.getByRole('img', { name: 'Imagen del producto' , exact: true }).nth(producto.indiceImagen);
    await expect(imagen, 'Imagen del producto no visible').toBeVisible({ timeout: 15000 });
    await imagen.click();

    const urlEsperada = `http://localhost:3000${producto.url}`;
    await expect(page, 'URL del producto incorrecta').toHaveURL(urlEsperada);

    await expect(page.getByRole('img', { name: 'Imagen principal', exact: true }), 'Imagen principal no visible').toBeVisible({ timeout: 10000 });

    const titulo = new RegExp(producto.nombre.replace(/\s+/g, '\\s*'));
    await expect(page.getByRole('heading', { level: 1, name: titulo }),'Heading principal del producto no visible').toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' }),'Heading de Especificaciones no visible').toBeVisible({ timeout: 10000 });

    await page.getByText('Volver atrás').first().click();
    await expect(headingCategoria, 'No volvió a la vista de categoría').toBeVisible({ timeout: 10000 });
  });
}
