import { cwd } from 'node:process';

import { gracefulExit } from '@simbo/graceful-exit';

/**
 * Wraps a CLI function to catch errors and handle a graceful exit.
 *
 * @param cliFn - The CLI function to wrap.
 * @param workingDir - The working directory for the CLI function.
 */
export async function clitch(cliFn: (workingDir?: string) => Promise<void> | void, workingDir = cwd()): Promise<void> {
  try {
    await cliFn(workingDir);
    await gracefulExit();
  } catch (error) {
    await gracefulExit(error);
  }
}
