import { isAccessible } from './is-accessible.js';

/**
 * Check if a directory is readable.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the directory is readable.
 */
export async function isReadableDirectory(path: string): Promise<boolean> {
  return isAccessible('directory', 'r', path);
}
