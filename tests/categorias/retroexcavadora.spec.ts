import { test, expect } from '@playwright/test';

const retroexcavadoras = [
  {
    nombre: 'John Deere 310P T2',
    url: '/product/310P%20T2',
    indiceImagen: 0,
  },
  {
    nombre: 'John Deere 310P T3',
    url: '/product/310P%20T3',
    indiceImagen: 1,
  },
  {
    nombre: 'John Deere 320P T2',
    url: '/product/320P%20T2',
    indiceImagen: 2,
  },
  {
    nombre: 'John Deere 320P T3',
    url: '/product/320P%20T3',
    indiceImagen: 3,
  },
];

for (const producto of retroexcavadoras) {
  test(producto.nombre, async ({ page }) => {
    await page.goto('http://localhost:3000/home');

    await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();

    const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(producto.indiceImagen);
    await expect(imagen).toBeVisible();
    await imagen.click();

    
    await expect(page).toHaveURL(`http://localhost:3000${producto.url}`);
    await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();

    const regexNombre = new RegExp(producto.nombre.replace(/\s+/g, '\\s*'));
    await expect(page.getByRole('heading', { level: 1, name: regexNombre })).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' })).toBeVisible();

    await page.getByText('Volver atrás').first().click();
    await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
  });
}
