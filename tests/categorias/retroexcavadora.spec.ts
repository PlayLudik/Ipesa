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
    await page.waitForLoadState('networkidle'); 

    const iconoCategoria = page.getByRole('img', { name: 'icon' }).nth(0);
    await expect(iconoCategoria, 'Icono de categoría no visible').toBeVisible({ timeout: 10000 });
    await iconoCategoria.click();

    const headingCategoria = page.getByRole('heading', { name: 'Retroexcavadora', exact: true });
    await expect(headingCategoria).toBeVisible({ timeout: 10000 });

    const imagen = page.getByRole('img', { name: 'Imagen del producto', exact: true  }).nth(producto.indiceImagen);
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
