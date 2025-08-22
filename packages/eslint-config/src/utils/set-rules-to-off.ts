import type { Linter } from 'eslint';

/**
 * Produce a rules record with all rules set to off for given rule names.
 *
 * @param ruleNames - The rule names to set to off.
 * @returns A rules record with all rules set to off.
 */
export function setRulesToOff(ruleNames: Set<string> | string[]): Linter.RulesRecord {
  ruleNames = Array.isArray(ruleNames) ? new Set<string>(ruleNames) : ruleNames;
  return Object.fromEntries([...ruleNames].map(rule => [rule, 'off']));
}
