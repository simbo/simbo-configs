import { isAccessible } from './is-accessible.js';

/**
 * Check if the given path is a directory.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the path is a directory.
 */
export async function isDirectory(path: string): Promise<boolean> {
  return isAccessible('directory', '', path);
}
