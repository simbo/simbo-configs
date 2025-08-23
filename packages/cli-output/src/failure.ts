import { red } from 'yoctocolors';

/**
 * A failure message prefixed with a colored icon.
 *
 * @param message - The message to display.
 * @returns The formatted failure message.
 */
export function failure(message: string): string {
  return `${red('✖')} ${message}`;
}
