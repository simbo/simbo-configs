import { join } from 'node:path';
import { cwd } from 'node:process';

import { globby } from 'globby';

import { getWorkspacePatterns } from './get-workspace-patterns.js';

/**
 * Options for getting workspace paths.
 */
export interface GetWorkspacePathsOptions {
  /**
   * The working directory to get the workspace paths from.
   * Defaults to the current working directory.
   *
   * @default process.cwd()
   */
  workingDir?: string;

  /**
   * The patterns to match workspace paths against.
   * If undefined or empty, patterns will be determined using `getWorkspacePatterns`.
   */
  patterns?: string[];

  /**
   * Whether to return absolute paths or relative paths.
   * Defaults to false (relative paths).
   *
   * @default false
   */
  absolutePaths?: boolean;
}

/**
 * Get the paths for all workspaces defined for the monorepo.
 *
 * The patterns will be passed to globby and found paths will be returned if
 * they contain a `package.json` file.
 *
 * @param options - The options for getting workspace paths.
 * @returns An array of workspace paths.
 * @throws {Error} If no workspace patterns are found or if no workspaces are found.
 */
export async function getWorkspacePaths(options: GetWorkspacePathsOptions = {}): Promise<string[]> {
  const { workingDir = cwd(), patterns = [], absolutePaths } = options;

  if (patterns.length === 0) {
    patterns.push(...(await getWorkspacePatterns({ workingDir })));
  }

  const globPatterns = patterns.map(pattern => join(pattern, 'package.json'));

  const paths = await globby(globPatterns, {
    cwd: workingDir,
    dot: true,
    followSymbolicLinks: true,
    gitignore: true,
  });

  if (paths.length === 0) {
    throw new Error('No workspaces found.');
  }

  return paths.map(path => {
    path = path.replace(/\/package\.json$/, '');
    if (absolutePaths) {
      path = join(workingDir, path);
    }
    return path;
  });
}
