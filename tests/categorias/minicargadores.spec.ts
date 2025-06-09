import { test, expect } from '@playwright/test';

test('John Deere 320G', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const imagen1 = page.getByRole('img', { name: 'icon' }).nth(6);
  await expect(imagen1).toBeVisible();
  await imagen1.click();
  await expect(page.getByRole('heading', { name: 'Minicargadores' })).toBeVisible();

  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(0);
  await expect(imagen).toBeVisible();
  await imagen.click();

  await expect(page).toHaveURL('http://localhost:3000/product/320G');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*320G/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Minicargadores' })).toBeVisible();
});


test('John Deere 324G', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const imagen1 = page.getByRole('img', { name: 'icon' }).nth(6);
  await expect(imagen1).toBeVisible();
  await imagen1.click();
  await expect(page.getByRole('heading', { name: 'Minicargadores' })).toBeVisible();

  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(1);
  await expect(imagen).toBeVisible();
  await imagen.click();

  await expect(page).toHaveURL('http://localhost:3000/product/324G');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*324G/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Minicargadores' })).toBeVisible();
});

test('John Deere 325G', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const imagen1 = page.getByRole('img', { name: 'icon' }).nth(6);
  await expect(imagen1).toBeVisible();
  await imagen1.click();
  await expect(page.getByRole('heading', { name: 'Minicargadores' })).toBeVisible();

  const imagen = page.getByRole('img', { name: 'Imagen del producto' }).nth(2);
  await expect(imagen).toBeVisible();
  await imagen.click();

  await expect(page).toHaveURL('http://localhost:3000/product/325G');
  await expect(page.getByRole('img', { name: 'Imagen principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /John Deere[\s\S]*325G/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name:'Especificaciones' })).toBeVisible();
  await page.getByText('Volver atrás').first().click();
  await expect(page.getByRole('heading', { name: 'Minicargadores' })).toBeVisible();
});