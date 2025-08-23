import { defineConfig } from '@eslint/config-helpers';

import type { ConfigsRecord } from '../configs-record.interface.js';
import { setRulesToOff } from '../utils/set-rules-to-off.js';

const recommended = defineConfig({
  files: [
    '**/*.+(test|spec|e2e).+(js|jsx|mjs|cjs|ts|tsx|mts|cts)',
    '**/?(__)+(tests|mocks)?(__)/**/*.+(js|jsx|mjs|cjs|ts|tsx|mts|cts)',
  ],
  rules: {
    /**
     * Rules completely off for test files:
     */
    ...setRulesToOff([
      '@typescript-eslint/no-magic-numbers',
      '@typescript-eslint/require-await',
      'unicorn/no-null',
      // TODO: maybe remove these completely:
      // '@typescript-eslint/no-unsafe-assignment',
      // '@typescript-eslint/no-unsafe-call',
      // '@typescript-eslint/no-unsafe-member-access',
      // 'n/no-extraneous-import',
      // 'n/no-unpublished-import',
      // 'unicorn/no-useless-undefined',
    ]),

    /**
     * Rules that are adjusted for test files:
     */
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false, // <- Allow type annotations in tests
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
  },
});

/**
 * Shared ESLint configurations for test files.
 */
export const testingConfigs: ConfigsRecord = {
  /**
   * ESLint configurations for Node.js projects for test files.
   */
  node: {
    /**
     * A recommended ESLint configuration for Node.js projects for test files.
     */
    recommended,
  },

  /**
   * ESLint configurations for browser projects for test files.
   */
  browser: {
    /**
     * A recommended ESLint configuration for browser projects for test files.
     */
    recommended,
  },
};
