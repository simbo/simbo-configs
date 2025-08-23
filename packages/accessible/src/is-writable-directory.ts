import { isAccessible } from './is-accessible.js';

/**
 * Check if a directory is writable.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the directory is writable.
 */
export async function isWritableDirectory(path: string): Promise<boolean> {
  return isAccessible('directory', 'w', path);
}
