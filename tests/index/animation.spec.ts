import { test, expect } from '@playwright/test';

test('Animación inicial se muestra y luego aparece el Home', async ({ page }) => {
  
  await page.goto('http://localhost:3000/');
 


  // PASO 10: Validar que se cargan las categorías en la vista Home
  const categoriaRetro = page.locator('text=Retroexcavadora');
  await expect(categoriaRetro).toBeVisible();

  
});
