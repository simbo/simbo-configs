import { isAccessible } from './is-accessible.js';

/**
 * Check if the given path is a file.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the path is a file.
 */
export async function isFile(path: string): Promise<boolean> {
  return isAccessible('file', '', path);
}
