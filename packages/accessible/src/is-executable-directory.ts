import { isAccessible } from './is-accessible.js';

/**
 * Check if a directory is executable.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the directory is executable.
 */
export async function isExecutableDirectory(path: string): Promise<boolean> {
  return isAccessible('directory', 'x', path);
}
