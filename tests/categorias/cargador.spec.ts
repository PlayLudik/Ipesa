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

      const imagen1 = page.getByRole('img', { name: 'icon' }).nth(2);
      await expect(imagen1).toBeVisible();
      await imagen1.click();

      await expect(page.getByRole('heading', { name: 'Cargador Frontal' })).toBeVisible();

      if (producto.extraSteps) {
        await producto.extraSteps(page);
      }

      const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(producto.imagenIndex);
      await expect(imagen).toBeVisible();
      await imagen.click();

      await expect(page).toHaveURL(`http://localhost:3000${producto.url}`);
      await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1, name: new RegExp(`John Deere[\\s\\S]*${producto.nombre.split(' ').pop()}`) })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' })).toBeVisible();

      await page.getByText('Volver atrás').first().click();

      await expect(page.getByRole('heading', { name: 'Cargador Frontal' })).toBeVisible();
    });
  }
});


