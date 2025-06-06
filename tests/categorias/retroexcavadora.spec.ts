import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/home');

//John Deere 310P T2
 // Ir a la categoría "Retroexcavadora"
await page.getByRole('listitem').filter({ hasText: 'Retroexcavadora' }).getByRole('img').click();

// Verificar que la imagen del producto 310P esté cargada correctamente
await expect(
  page.locator('img[src="/images/productos/retroexcavadora/310P T2.webp"]')).toBeVisible(); 

// Click en el producto con imagen específica
await page.getByRole('img', { name: 'Imagen del producto' }).first().click();

// Confirmar que es la ficha de la 310P
await expect(page.getByRole('heading', { name: 'John Deere 310P T2' })).toBeVisible();

// Ir a "Especificaciones"
await page.getByRole('heading', { name: 'Especificaciones' }).click();

// Descargar PDF (esperando el evento)
const downloadPromise = page.waitForEvent('download');
await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
const download = await downloadPromise;

const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 310P_compressed.pdf');
expect(download.url()).toContain(expectedUrl);

// Volver atrás a la vista anterior
await page.getByText('Volver atrás').first().click();

// Verificar que estamos en la categoría "Retroexcavadora" original
await expect(page.locator('h3')).toHaveText('Retroexcavadora'); // o el texto específico del bloque
});


test('310P T3', async ({ page }) => {

await page.goto('http://localhost:3000/home');
await page.getByRole('listitem').filter({ hasText: 'Retroexcavadora' }).getByRole('img').click();
await expect(page.locator('img[src="/images/productos/retroexcavadora/310P T3.webp"]')).toBeVisible(); 
await page.getByRole('img', { name: 'Imagen del producto' }).first().click();
await expect(page.getByRole('heading', { name: 'John Deere 310P T2' })).toBeVisible({ timeout: 10000 }); 
await page.getByRole('heading', { name: 'Especificaciones' }).click();
const downloadPromise = page.waitForEvent('download');
await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
const download = await downloadPromise;
const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 310P_compressed.pdf');
expect(download.url()).toContain(expectedUrl);
await page.getByText('Volver atrás').first().click();
await expect(page.locator('h3')).toHaveText('Retroexcavadora');
});



test('320 T2' , async ({ page }) => {

await page.goto('http://localhost:3000/home');
await page.getByRole('listitem').filter({ hasText: 'Retroexcavadora' }).getByRole('img').click();
await expect(
  page.getByRole('heading', { name: 'John Deere 320P T2' })
).toBeVisible({ timeout: 10000 });

 
await page.getByRole('img', { name: 'Imagen del producto' }).first().click();
await expect(page.getByRole('heading', { name: 'John Deere 320P T2' })).toBeVisible(); 
await page.getByRole('heading', { name: 'Especificaciones' }).click();
const downloadPromise = page.waitForEvent('download');
await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
const download = await downloadPromise;
const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 320P_compressed.pdf');
expect(download.url()).toContain(expectedUrl);
await page.getByText('Volver atrás').first().click();
await expect(page.locator('h3')).toHaveText('Retroexcavadora');
});

test('320 T3' , async ({ page }) => {

await page.goto('http://localhost:3000/home');
await page.getByRole('listitem').filter({ hasText: 'Retroexcavadora' }).getByRole('img').click();
await expect(page.locator('img[src="/images/productos/retroexcavadora/320p.webp"]')).toBeVisible(); 
await page.getByRole('img', { name: 'Imagen del producto' }).first().click();
await expect(page.getByRole('heading', { name: 'John Deere 320P T3' })).toBeVisible({ timeout: 10000 }); 
await page.getByRole('heading', { name: 'Especificaciones' }).click();
const downloadPromise = page.waitForEvent('download');
await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
const download = await downloadPromise;
const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 320P_compressed.pdf');
expect(download.url()).toContain(expectedUrl);
await page.getByText('Volver atrás').first().click();
await expect(page.locator('h3')).toHaveText('Retroexcavadora');
});