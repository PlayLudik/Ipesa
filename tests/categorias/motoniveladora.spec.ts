import { test, expect } from '@playwright/test';

const productos = [
  {
    nombre: 'John Deere 620 P',
    url: '/product/620P',
    indiceImagen: 0,
  },
  {
    nombre: 'John Deere 670 P',
    url: '/product/670P',
    indiceImagen: 1,
  },
  {
    nombre: 'John Deere 770 P',
    url: '/product/770P',
    indiceImagen: 2,
  },
];

for (const producto of productos) {
  test(producto.nombre, async ({ page }) => {
    await page.goto('http://localhost:3000/home');

    const iconoCategoria = page.getByRole('img', { name: 'icon' }).nth(4);
    await expect(iconoCategoria).toBeVisible();
    await iconoCategoria.click();
    await expect(page.getByRole('heading', { name: 'Motoniveladora' })).toBeVisible();

    const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(producto.indiceImagen);
    await expect(imagen).toBeVisible();
    await imagen.click();

    await expect(page).toHaveURL(`http://localhost:3000${producto.url}`);
    await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();

    const nombreFlexible = new RegExp(producto.nombre.replace(/\s+/g, '\\s*'));
    await expect(page.getByRole('heading', { level: 1, name: nombreFlexible })).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' })).toBeVisible();

    await page.getByText('Volver atrás').first().click();
    await expect(page.getByRole('heading', { name: 'Motoniveladora' })).toBeVisible();
  });
}
