import { stdout } from 'node:process';

const DEFAULT_LINE_MAX_WIDTH = 80;

/**
 * A horizontal line to be displayed in the console.
 * Uses "─" (U+2500, "BOX_DRAWINGS_LIGHT_HORIZONTAL") character for the line.
 *
 * @param maxWidth - The maximum width of the line. Defaults to 80. Limited by `stdout.columns`.
 * @returns The formatted line.
 */
export function line(maxWidth = DEFAULT_LINE_MAX_WIDTH): string {
  return '─'.repeat(Math.min(maxWidth, stdout.columns));
}
