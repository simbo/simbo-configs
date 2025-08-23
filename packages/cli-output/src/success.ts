import { green } from 'yoctocolors';

/**
 * A success message prefixed with a colored icon.
 *
 * @param message - The message to display.
 * @returns The formatted success message.
 */
export function success(message: string): string {
  return `${green('✔')} ${message}`;
}
