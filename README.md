# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

TESTING 
Instalación
Primero, instala las dependencias necesarias para Playwright:
npm install -D @playwright/test
npx playwright install
Esto instalará Playwright junto con los navegadores necesarios. En nuestro caso, solo utilizaremos Google Chrome.


Configuración para Chrome
La configuración de Playwright está definida en playwright.config.ts. Solo se ejecutarán las pruebas en el navegador Chrome:
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
   projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  testDir: './tests', // Ajustar si los tests están en otra ruta
});


Ejecutar pruebas
▶ Ejecutar todos los tests:
npx playwright test

▶ Ejecutar un archivo de prueba específico:
npx playwright test home/categorias.spec.ts