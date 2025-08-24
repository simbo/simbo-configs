import { describe, expect, it } from 'vitest';

import { parseStringInput } from './parse-string-input.js';

describe('parseStringInput', () => {
  it('wraps a single string in an array', () => {
    expect(parseStringInput('foo')).toEqual(['foo']);
  });

  it('filters out non-strings from an array', () => {
    expect(parseStringInput(['a', 1, null, 'b'])).toEqual(['a', 'b']);
  });

  it('returns an empty array for non-string input', () => {
    expect(parseStringInput(42)).toEqual([]);
    expect(parseStringInput(null)).toEqual([]);
    expect(parseStringInput({})).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(parseStringInput([])).toEqual([]);
  });
});
