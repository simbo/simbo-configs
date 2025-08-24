import { join } from 'node:path';
import { cwd } from 'node:process';

import { isExecutableFile } from '@simbo/accessible';
import { execa } from 'execa';
import { findUp } from 'find-up';

/**
 * Options for finding a binary executable.
 */
export interface Options {
  /**
   * The working directory to start searching for the binary in.
   * If not specified, the current working directory will be used.
   *
   * @default process.cwd()
   */
  workingDir?: string;
}

/**
 * Finds the path to a binary executable.
 *
 * Currently only supports finding binaries in local `node_modules/.bin`
 * directories or globally installed binaries.
 *
 * @param name - The name of the binary to find.
 * @param options - Options for finding the binary.
 * @returns The path to the binary if found, or undefined if not.
 */
export async function findBin(name: string, options: Options = {}): Promise<string | undefined> {
  const { workingDir = cwd() } = options;

  if (typeof name !== 'string') {
    throw new TypeError('Command name must be a string');
  }

  name = name.trim();

  if (name.length === 0) {
    throw new Error('Command name must not be empty');
  }

  const binPath = await findUp(
    async (path: string) => {
      const potentialBinPath = join(path, 'node_modules', '.bin', name);
      return validatePotentialBinPath(potentialBinPath);
    },
    { cwd: workingDir },
  );

  if (binPath) {
    return binPath;
  }

  try {
    const { stdout } = await execa({ cwd: workingDir })`which ${name}`;
    return await validatePotentialBinPath(stdout.trim());
  } catch {
    return undefined;
  }
}

/**
 * Validates a potential binary path by checking if it is executable.
 *
 * @param path - The path to the potential binary.
 * @returns The path if it is executable, or undefined if not.
 */
async function validatePotentialBinPath(path: string): Promise<string | undefined> {
  return (await isExecutableFile(path)) ? path : undefined;
}
