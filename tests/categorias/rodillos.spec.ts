import { test, expect } from '@playwright/test';

const rodillos = [
  {
    nombre: 'HAMM HC 110',
    url: '/product/HC%20110',
    indiceImagen: 0,
  },
  {
    nombre: 'HAMM HC 110G',
    url: '/product/HC%20110G',
    indiceImagen: 1,
  },
  {
    nombre: 'HAMM HC 200',
    url: '/product/HC%20200',
    indiceImagen: 2,
  },
];

for (const producto of rodillos) {
  test(producto.nombre, async ({ page }) => {
    await page.goto('http://localhost:3000/home');

    const iconoCategoria = page.getByRole('img', { name: 'icon' }).nth(5);
    await expect(iconoCategoria).toBeVisible();
    await iconoCategoria.click();
    await expect(page.getByRole('heading', { name: 'Rodillos de Suelo' })).toBeVisible();

    const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(producto.indiceImagen);
    await expect(imagen).toBeVisible();
    await imagen.click();

    await expect(page).toHaveURL(`http://localhost:3000${producto.url}`);
    await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();

    const nombreFlexible = new RegExp(producto.nombre.replace(/\s+/g, '\\s*'));
    await expect(page.getByRole('heading', { level: 1, name: nombreFlexible })).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' })).toBeVisible();

    await page.getByText('Volver atrás').first().click();
    await expect(page.getByRole('heading', { name: 'Rodillos de Suelo' })).toBeVisible();
  });
}
