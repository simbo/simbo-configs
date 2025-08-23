import { dirname, resolve } from 'node:path';

import typescript from 'typescript';
import { describe, expect, it } from 'vitest';

const configPath = resolve(import.meta.dirname, '../tsconfig.json');

describe('tsconfig', () => {
  it('is a valid TypeScript config', () => {
    // Read and parse tsconfig
    const readResult = typescript.readConfigFile(configPath, (path: string) => typescript.sys.readFile(path));
    expect(readResult.error).toBeUndefined();

    // Validate compiler options
    const parsedResult = typescript.parseJsonConfigFileContent(readResult.config, typescript.sys, dirname(configPath));
    expect(parsedResult.errors).toEqual([]);
  });
});
