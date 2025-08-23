import { basename } from 'node:path';
import { argv } from 'node:process';

import { yellow } from 'yoctocolors';

/**
 * Message to be displayed when hinting the user to run the help command.
 *
 * @param commandName - The name of the command to include in the hint.
 * @returns The formatted hint message.
 */
export function hintToHelp(commandName = basename(argv[1])): string {
  return `Run ${yellow(`${commandName} --help`)} for usage information.`;
}
