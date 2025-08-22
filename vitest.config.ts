import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['packages/*/{src,tests}/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'html', 'lcov'],
      exclude: [
        'packages/*/{dist,tests,mocks,coverage}/**/*',
        'packages/*/src/**/*.{type,types,interface,interfaces,enum}.ts',
        'packages/*/src/**/index.ts',
        'packages/*/*.config.ts',
        'docs/**/*',
        '*.ts',
        '*.js',
      ],
    },
    projects: ['packages/*'],
  },
});
