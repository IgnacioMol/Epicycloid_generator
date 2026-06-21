import { defineConfig } from 'vitest/config';

/**
 * Configuración adicional para el runner de pruebas (Vitest), cargada por
 * `@angular/build:unit-test` gracias a la opción `runnerConfig: true` de angular.json.
 *
 * p5.js importa internamente `gifenc`, un módulo CommonJS cuyos exports con nombre
 * (`GIFEncoder`, …) no se resuelven bajo ESM nativo. Al "inlinar" p5 y gifenc,
 * Vitest los procesa con su pipeline de transformación y el interop CJS→ESM funciona,
 * de modo que los specs que importan el lienzo (app.spec, canvas.spec) pueden cargar.
 */
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/p5/, /gifenc/],
      },
    },
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
          include: ['p5', 'gifenc'],
        },
      },
    },
  },
});
