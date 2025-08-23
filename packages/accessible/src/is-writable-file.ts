import { isAccessible } from './is-accessible.js';

/**
 * Check if a file is writable.
 *
 * @param path - The path to check.
 * @returns A promised boolean indicating if the file is writable.
 */
export async function isWritableFile(path: string): Promise<boolean> {
  return isAccessible('file', 'w', path);
}
