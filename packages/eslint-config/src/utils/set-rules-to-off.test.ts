import { describe, expect, it } from 'vitest';

import { setRulesToOff } from './set-rules-to-off.js';

describe('setRulesToOff', () => {
  it('converts a string[] into a RuleSet with all rules set to "off"', () => {
    const result = setRulesToOff(['no-console', 'eqeqeq']);
    expect(result).toEqual({
      'no-console': 'off',
      eqeqeq: 'off',
    });
  });

  it('works with a Set of rule names', () => {
    const result = setRulesToOff(new Set(['no-debugger']));
    expect(result).toEqual({ 'no-debugger': 'off' });
  });

  it('returns an empty object for empty input', () => {
    expect(setRulesToOff([])).toEqual({});
    expect(setRulesToOff(new Set())).toEqual({});
  });
});
