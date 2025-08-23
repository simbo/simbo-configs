import type { Linter } from 'eslint';

/**
 * Creates a rule set with the `no-restricted-globals` rule based on the
 * provided globals record and an optional allow-list of exceptions.
 *
 * @param globals - The globals to check against.
 * @param allowed - The globals that are allowed to be used.
 * @returns A rule set with the `no-restricted-globals` rule.
 */
export function noRestrictedGlobalsRule(
  globals: string[] | Record<string, unknown>,
  allowed: string[] | Set<string> = [],
): Linter.RulesRecord {
  globals = Array.isArray(globals) ? globals : Object.keys(globals);
  const allowedGlobals = new Set<string>(Array.isArray(allowed) ? allowed : [...allowed]);
  const restrictedGlobals: { name: string; message?: string }[] = [];
  for (const name of globals) {
    if (/^[a-z]/.test(name) && !allowedGlobals.has(name)) {
      restrictedGlobals.push({ name });
    }
  }
  return restrictedGlobals.length === 0 ? {} : { 'no-restricted-globals': ['error', ...restrictedGlobals] };
}
