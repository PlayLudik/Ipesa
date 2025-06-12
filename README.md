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

# Testing automatizado con Playwright 

Este proyecto utiliza Playwright para realizar pruebas automatizadas en el navegador. 

# Instalación
Antes de ejecutar las pruebas, hay que instalar Playwright y sus navegadores:

#Instala Playwright como dependencia de desarrollo
npm install -D @playwright/test

#Descarga los navegadores necesarios (Chromium, Firefox y WebKit)
npx playwright install
En este proyecto solo usaremos Google Chrome (Chromium), pero los tres navegadores se descargan por defecto.

# Configuración de Playwright
La configuración se encuentra en el archivo playwright.config.ts. Allí indicamos:

// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Carpeta donde se guardan los tests
  projects: [
    {
      name: 'chromium', // Usamos solo el navegador Chrome
      use: { ...devices['Desktop Chrome'] }, // Simula Chrome en una PC
    },
  ],
});


# Cómo ejecutar las pruebas
A continuación se detallan los comandos más comunes:

#Ejecutar todas las pruebas del proyecto:
npx playwright test

#Ejecutar un archivo de prueba específico:
npx playwright test tests/home/categorias.spec.ts

Ejecutar pruebas con varios "workers" (paralelo):
npx playwright test --workers=2

Esto permite ejecutar tests en paralelo para acelerar los tiempos.
Si tu entorno da errores, podés usar --workers=1 para desactivar el paralelismo.