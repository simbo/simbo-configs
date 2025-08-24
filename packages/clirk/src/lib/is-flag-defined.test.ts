import { describe, expect, it } from 'vitest';

import { isFlagDefined } from './is-flag-defined.js';

describe('isFlagDefined', () => {
  it('returns true for a flag defined in boolean', () => {
    const opts = { boolean: ['verbose'] };
    expect(isFlagDefined(opts, 'verbose')).toBe(true);
  });

  it('returns true for a flag defined as an alias', () => {
    const opts = { alias: { v: 'verbose' } };
    expect(isFlagDefined(opts, 'v')).toBe(true);
  });

  it('returns false for unknown flags', () => {
    const opts = { boolean: ['debug'], alias: { d: 'debug' } };
    expect(isFlagDefined(opts, 'verbose')).toBe(false);
  });

  it('returns false when opts is undefined', () => {
    expect(isFlagDefined(undefined, 'verbose')).toBe(false);
  });
});
