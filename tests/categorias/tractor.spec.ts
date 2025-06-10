import { test, expect } from '@playwright/test';

type Producto = {
  nombre: string;
  imagenIndex: number;
  url: string;
};

const productos: Producto[] = [
  { 
    nombre: 'John Deere 550J', 
    imagenIndex: 0, 
    url: '/product/550J' 
  },
  { 
    nombre: 'John Deere 650J', 
    imagenIndex: 1, url: '/product/650J' 
  },
  { 
    nombre: 'John Deere 750J-II', 
    imagenIndex: 2, 
    url: '/product/750J-II' 
  },
  { 
    nombre: 'John Deere 850J-II', 
    imagenIndex: 3, 
    url: '/product/850J-II' 
  },
  { nombre: 'John Deere 1050 P', 
    imagenIndex: 4, 
    url: '/product/1050%20P' 
  },
];

test.describe('Pruebas productos Tractor de Orugas', () => {
  for (const producto of productos) {
    test(producto.nombre, async ({ page }) => {
      await page.goto('http://localhost:3000/home');

      const icono = page.getByRole('img', { name: 'icon' }).nth(3);
      await expect(icono).toBeVisible();
      await icono.click();

      await expect(page.getByRole('heading', { name: 'Tractor de Orugas' })).toBeVisible();

      const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(producto.imagenIndex);
      await expect(imagen).toBeVisible();
      await imagen.click();

      await expect(page).toHaveURL(`http://localhost:3000${producto.url}`);
      await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1, name: new RegExp(`John Deere[\\s\\S]*${producto.nombre.split(' ').pop()}`) })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Especificaciones' })).toBeVisible();

      await page.getByText('Volver atrás').first().click();

      await expect(page.getByRole('heading', { name: 'Tractor de Orugas' })).toBeVisible();
    });
  }
});
