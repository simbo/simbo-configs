/**
 * Parses an unknown input into an array of strings.
 *
 * If a single string is passed, it will be wrapped in an array.
 * If an array is passed, only string elements will be kept.
 * All other types result in an empty array.
 *
 * @param input - The input to parse.
 * @returns An array of strings.
 */
export function parseStringInput(input: unknown): string[] {
  return typeof input === 'string'
    ? [input]
    : Array.isArray(input)
      ? input.filter((item): item is string => typeof item === 'string')
      : [];
}
