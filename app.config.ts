import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  vite: {
    plugins: [
      tailwindcss() as any,
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
});
