import { describe, expect, it } from 'vitest';

import { eslintJsConfigs } from '../src/configs/eslint-js-configs.js';
import { jsdocConfigs } from '../src/configs/jsdoc-configs.js';
import { nConfigs } from '../src/configs/n-configs.js';
import { prettierConfigs } from '../src/configs/prettier-configs.js';
import { testingConfigs } from '../src/configs/testing-configs.js';
import { typescriptEslintConfigs } from '../src/configs/typescript-eslint-configs.js';
import { unicornConfigs } from '../src/configs/unicorn-configs.js';
import { configs } from '../src/index.js';

const records = {
  configs,
  eslintJsConfigs,
  jsdocConfigs,
  nConfigs,
  prettierConfigs,
  testingConfigs,
  typescriptEslintConfigs,
  unicornConfigs,
};

const expected1stLevel = ['node', 'browser'];
const expected2stLevel = ['recommended'];

describe('eslint-config exports test', () => {
  it('should export configs record objects in the expected format', () => {
    const mismatches: string[] = [];
    for (const [name, record] of Object.entries(records) as unknown as [
      string,
      Record<string, Record<string, unknown>>,
    ][]) {
      if (
        expected1stLevel.every(
          level =>
            (Object.hasOwn(record, level) &&
              expected2stLevel.every(subLevel => Object.hasOwn(record[level], subLevel))) ||
            // the node config has no browser variation
            (level === 'browser' && name === 'nConfigs'),
        )
      ) {
        continue;
      }
      mismatches.push(name);
    }
    expect(mismatches).toEqual([]);
  });
});
