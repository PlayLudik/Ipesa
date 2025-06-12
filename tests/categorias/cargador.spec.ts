import { test, expect } from '@playwright/test';

type Producto = {
  nombre: string;
  imagenIndex: number;
  url: string;
  extraSteps?: (page: any) => Promise<void>; 
};

const productos: Producto[] = [
  {
    nombre: 'John Deere 444G',
    imagenIndex: 0,
    url: '/product/444G',
  },
  {
    nombre: 'John Deere 624P',
    imagenIndex: 1,
    url: '/product/624P',
  },
  {
    nombre: 'John Deere 644G',
    imagenIndex: 2,
    url: '/product/644G',
  },
  {
    nombre: 'John Deere 644P',
    imagenIndex: 3,
    url: '/product/644P',
  },
  {
    nombre: 'John Deere 724P',
    imagenIndex: 4,
    url: '/product/724P',
  },
  {
    nombre: 'John Deere 744P',
    imagenIndex: 5,
    url: '/product/744P',
  },
  {
    nombre: 'John Deere 844P',
    imagenIndex: 0,
    url: '/product/844P',
    extraSteps: async (page) => {
      await page.getByText('2', { exact: true }).click();
      await expect(page).toHaveURL('http://localhost:3000/home');
      await expect(page.getByRole('heading', { name: 'Cargador Frontal' })).toBeVisible();
    }
  },
];

test.describe('Pruebas productos Cargador Frontal', () => {
  for (const producto of productos) {
    test(producto.nombre, async ({ page }) => {
      await page.goto('http://localhost:3000/home');
      await page.waitForLoadState('networkidle'); 

      const icono = page.getByRole('img', { name: 'icon' }).nth(2);
      await expect(icono, 'Icono de categoría no visible').toBeVisible({ timeout: 10000 });
      await icono.click();

      const headingCategoria = page.getByRole('heading', { name: 'Cargador Frontal', exact: true });
      await expect(headingCategoria).toBeVisible({ timeout: 10000 });

      if (producto.extraSteps) {
        await producto.extraSteps(page);
      }

      const imagen = page.getByRole('img', { name: 'Imagen del producto' , exact: true }).nth(producto.imagenIndex);
      await expect(imagen, 'Imagen del producto no visible').toBeVisible({ timeout: 15000 });
      await imagen.click();

      const urlEsperada = `http://localhost:3000${producto.url}`;
      await expect(page, 'URL del producto incorrecta').toHaveURL(urlEsperada);

      await expect(page.getByRole('img', { name: 'Imagen principal', exact: true }), 'Imagen principal no visible').toBeVisible({ timeout: 10000 });

      const titulo = new RegExp(`John Deere[\\s\\S]*${producto.nombre.split(' ').pop()}`);
      await expect(page.getByRole('heading', { level: 1, name: titulo }),'Heading principal del producto no visible').toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' }),'Heading de Especificaciones no visible').toBeVisible({ timeout: 10000 });

      await page.getByText('Volver atrás').first().click();
      await expect(headingCategoria, 'No volvió a la vista de categoría').toBeVisible({ timeout: 10000 });
    });
  }
});


