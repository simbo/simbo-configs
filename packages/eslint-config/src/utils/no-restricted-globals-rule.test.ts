import { describe, expect, it } from 'vitest';

import { noRestrictedGlobalsRule } from './no-restricted-globals-rule.js';

describe('noRestrictedGlobalsRule', () => {
  it('returns a valid rule config for no-restricted-globals', () => {
    const ruleSet = noRestrictedGlobalsRule(['window', 'document'], ['document']);
    expect(ruleSet).toHaveProperty('no-restricted-globals');
    expect(ruleSet['no-restricted-globals']).toEqual(['error', { name: 'window' }]);
  });

  it('works with record input for globals', () => {
    const result = noRestrictedGlobalsRule({ window: {}, document: {}, CustomEvent: {} }, ['document']);
    expect(result['no-restricted-globals']).toEqual(['error', { name: 'window' }]);
  });

  it('works with set input for allow-list', () => {
    const result = noRestrictedGlobalsRule({ window: {}, document: {}, CustomEvent: {} }, new Set(['document']));
    expect(result['no-restricted-globals']).toEqual(['error', { name: 'window' }]);
  });

  it('returns empty object when no globals are restricted', () => {
    const result = noRestrictedGlobalsRule(['window'], ['window']);
    expect(result).toEqual({});
  });
});
