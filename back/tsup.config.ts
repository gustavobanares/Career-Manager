import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'], // Coloque o arquivo principal do seu projeto
  outDir: 'build',
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  dts: true,
  external: ['vitest'], // Ignora o Vitest na build
  exclude: ['src/tests/**'], // Exclui arquivos de teste do build
})
