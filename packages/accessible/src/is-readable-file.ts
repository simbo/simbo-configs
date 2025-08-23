import { isAccessible } from './is-accessible.js';

/**
 * Check if a file is readable.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the file is readable.
 */
export async function isReadableFile(path: string): Promise<boolean> {
  return isAccessible('file', 'r', path);
}
