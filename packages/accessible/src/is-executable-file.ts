import { isAccessible } from './is-accessible.js';

/**
 * Check if a file is executable.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the file is executable.
 */
export async function isExecutableFile(path: string): Promise<boolean> {
  return isAccessible('file', 'x', path);
}
