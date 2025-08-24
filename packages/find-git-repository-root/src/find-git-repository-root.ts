import { cwd } from 'node:process';

import { isGitRepositoryRoot } from '@simbo/is-git-repository-root';
import { findUp } from 'find-up';

/**
 * Finds the root directory of a Git repository by searching upwards from the given working directory.
 *
 * It uses `@simbo/is-git-repository-root` to check if a directory is a Git repository root.
 *
 * @param workingDir - The directory from which to start searching for the Git root. Defaults to the current working directory.
 * @returns A promise that resolves to the path of the Git repository root, or undefined if not found.
 */
export async function findGitRepositoryRoot(workingDir = cwd()): Promise<string | undefined> {
  const matcher = async (path: string): Promise<string | undefined> =>
    (await isGitRepositoryRoot(path)) ? path : undefined;
  return findUp(matcher, { cwd: workingDir, type: 'directory' });
}
