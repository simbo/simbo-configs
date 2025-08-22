import { defineConfig } from '@eslint/config-helpers';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import { ConfigsRecord } from '../configs-record.interface.js';
import { setRulesToOff } from '../utils/set-rules-to-off.js';

const recommended = defineConfig({
  extends: [eslintPluginUnicorn.configs.all],
  rules: {
    'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
    'unicorn/import-style': ['error', { styles: { path: { named: true } }, extendDefaultStyles: false }],
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],

    /**
     * Disabled Rules
     */
    ...setRulesToOff([
      // Reason: too opinionated
      'unicorn/no-array-reduce',
      'unicorn/no-await-expression-member',
      'unicorn/no-useless-switch-case',
      'unicorn/prevent-abbreviations',
    ]),
  },
});

/**
 * Shared ESLint configurations based on `eslint-plugin-unicorn` configurations.
 *
 * @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn Website}
 * @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn#preset-configs Configs}
 * @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn#rules Rules}
 */
export const unicornConfigs: ConfigsRecord = {
  /**
   * ESLint configurations for Node.js projects based on `eslint-plugin-unicorn`.
   */
  node: {
    /**
     * A recommended ESLint configuration for Node.js projects based on `eslint-plugin-unicorn`.
     */
    recommended,
  },

  /**
   * ESLint configurations for browser projects based on `eslint-plugin-unicorn`.
   */
  browser: {
    /**
     * A recommended ESLint configuration for browser projects based on `eslint-plugin-unicorn`.
     */
    recommended,
  },
};
