import { test, expect } from '@playwright/test';

test('John Deere 130P', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await expect(page.getByRole('heading', { name: 'Excavadora' })).toBeVisible();

  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(0);
  await expect(imagen).toBeVisible();
  await imagen.click();

  await expect(page).toHaveURL('http://localhost:3000/product/310P%20T2');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*310P T2/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
  const download = await downloadPromise;
  const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 310P_compressed.pdf');
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
});


test('John Deere 310P T3', async ({ page }) => {

  await page.goto('http://localhost:3000/home');
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(1);
  await expect(imagen).toBeVisible();
  await imagen.click();
  await expect(page).toHaveURL('http://localhost:3000/product/310P%20T3');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*310P T3/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
  const download = await downloadPromise;
  const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 310P_compressed.pdf');
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
});

test('John Deere 320P T2' , async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();

  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(2);
  await expect(imagen).toBeVisible();
  await imagen.click();

  await expect(page).toHaveURL('http://localhost:3000/product/320P%20T2');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*320P T2/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
  const download = await downloadPromise;
  const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 320P_compressed.pdf');
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
});

test('John Deere 320 T3' , async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(3);
  await expect(imagen).toBeVisible();
  await imagen.click();
  await expect(page).toHaveURL('http://localhost:3000/product/320P%20T3');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*320P T3/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Descargar Ficha Técnica' }).click();
  const download = await downloadPromise;
  const expectedUrl = encodeURI('/pdfs/Retroexcavadora/FICHA TÉCNICA - 320P_compressed.pdf');
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Retroexcavadora' })).toBeVisible();
});