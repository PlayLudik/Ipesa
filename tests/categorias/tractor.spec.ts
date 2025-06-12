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
      await page.waitForLoadState('networkidle'); 

      const icono = page.getByRole('img', { name: 'icon' }).nth(3);
      await expect(icono, 'Icono de categoría no visible').toBeVisible({ timeout: 10000 });
      await icono.click();

      const headingCategoria = page.getByRole('heading', { name: 'Tractor de Orugas', exact: true });
      await expect(headingCategoria).toBeVisible({ timeout: 10000 });

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

