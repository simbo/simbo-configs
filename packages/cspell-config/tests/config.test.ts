import { describe, expect, it } from 'vitest';

const pkg = await import('../src/index.js');

describe('CSpell Configuration Package', () => {
  it('provides a cspell config as default export', () => {
    expect(pkg.default).toBeDefined();
    expect(pkg.default.files).toBeDefined();
    expect(pkg.default.dictionaries).toBeDefined();
  });

  it('has no other exports', () => {
    const keys = Object.keys(pkg);
    expect(keys).toHaveLength(1);
    expect(keys[0]).toBe('default');
  });
});
