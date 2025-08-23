import prettier from 'prettier';
import { describe, expect, it } from 'vitest';

import config from '../src/index.js';

describe('Prettier Config', () => {
  it('is accepted by Prettier and formats code correctly', async () => {
    const code = `const x=[1,2]`;
    const expected = `const x = [1, 2];\n`;
    const result = await prettier.format(code, { ...config, parser: 'babel' });

    expect(result).toBe(expected);
  });
});
