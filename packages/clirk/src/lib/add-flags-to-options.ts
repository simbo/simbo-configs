import type { ClirkOptions } from '../clirk.types.js';

const FLAGS = ['help', 'version'] as const;

const FLAG_DESCRIPTIONS: Record<string, string> = {
  help: 'Display this help message.',
  version: 'Display the package name and version.',
};

/**
 * Adds common CLI flags (e.g. --help, --version) to the Clirk options.
 *
 * This injects their flag definitions, aliases, and descriptions into the
 * minimist options and help text maps.
 *
 * @param input - The original ClirkOptions.
 * @param flags - A map of built-in flags to enable (e.g. `{ help: true }`).
 * @returns A new ClirkOptions object with updated argsOptions and options.
 */
export function addFlagsToOptions(input: ClirkOptions, flags: Record<string, boolean> = {}): ClirkOptions {
  const result = {
    ...input,
    argsOptions: {
      ...input.argsOptions,
      boolean: [...new Set(Array.isArray(input.argsOptions?.boolean) ? input.argsOptions.boolean : [])],
      alias: { ...input.argsOptions?.alias },
    },
    options: { ...input.options },
  };

  for (const flag of FLAGS) {
    if (flags[flag]) {
      result.argsOptions.boolean = [...new Set([...result.argsOptions.boolean, flag])];
      result.argsOptions.alias[flag] = [flag[0]];
      if (!(flag in result.options)) {
        result.options[flag] = FLAG_DESCRIPTIONS[flag];
      }
    }
  }

  return result;
}
