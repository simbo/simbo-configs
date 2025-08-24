import type { Opts } from 'minimist';

/**
 * Checks if a flag is defined in the provided minimist options.
 *
 * A flag is considered defined if:
 * - It is listed in the `boolean` array, or
 * - It is listed as a key in the `alias` object.
 *
 * @param opts - The minimist options object.
 * @param flag - The long or short flag name to check.
 * @returns True if the flag is defined as a boolean or has an alias, false otherwise.
 */
export function isFlagDefined(opts: Opts | undefined, flag: string): boolean {
  if (!opts) return false;
  return (Array.isArray(opts.boolean) && opts.boolean.includes(flag)) || !!opts.alias?.[flag];
}
