import { cwd } from 'node:process';

import { readWorkspaces, type WorkspaceMetadata } from '@simbo/monorepo-utils';

import { defaultBeforeFn } from './default-before-fn.js';
import { defaultTemplateFn } from './default-template-fn.js';
import type { Options } from './monorepo-packages-list.types.js';

/**
 * Generates a list of monorepo packages with metadata.
 *
 * @param options - The options to customize the package list.
 * @returns A list of monorepo packages with metadata.
 */
export async function monorepoPackagesList(options: Options = {}): Promise<string> {
  const { workingDir, templateFn, templateData, sortCompareFn, filterFn, before, after, delimiter } =
    parseOptions(options);

  const workspaces = (await readWorkspaces({ workingDir })).filter(workspace => filterFn(workspace));

  workspaces.sort(sortCompareFn);

  const listItems = await Promise.all(workspaces.map(async workspace => templateFn(workspace, templateData)));

  const list = listItems.join(delimiter);

  return [
    typeof before === 'function' ? await before(workspaces) : before,
    list,
    typeof after === 'function' ? await after(workspaces) : after,
  ].join('');
}

/**
 * Parses the options for the monorepoPackagesList function.
 *
 * @param options - The options to parse.
 * @returns The parsed options.
 */
// eslint-disable-next-line complexity
function parseOptions(options: Options): Required<Options> {
  const {
    workingDir = cwd(),
    templateFn = defaultTemplateFn,
    templateData = {},
    sortCompareFn = (a: WorkspaceMetadata, b: WorkspaceMetadata) => a.relativePath.localeCompare(b.relativePath),
    filterFn = () => true,
    before = defaultBeforeFn,
    after = '',
    delimiter = '\n\n',
  } = options;

  if (typeof before !== 'string' && typeof before !== 'function') {
    throw new TypeError(`Expected 'before' to be a string or a function, got ${typeof before}`);
  }

  if (typeof after !== 'string' && typeof after !== 'function') {
    throw new TypeError(`Expected 'after' to be a string or a function, got ${typeof after}`);
  }

  if (typeof delimiter !== 'string') {
    throw new TypeError(`Expected 'delimiter' to be a string, got ${typeof delimiter}`);
  }

  if ((templateFn as unknown) !== undefined && typeof templateFn !== 'function') {
    throw new TypeError(`Expected 'templateFn' to be a function, got ${typeof templateFn}`);
  }

  if ((templateData as unknown) !== undefined && typeof templateData !== 'object') {
    throw new TypeError(`Expected 'templateData' to be an object, got ${typeof templateData}`);
  }

  if ((sortCompareFn as unknown) !== undefined && typeof sortCompareFn !== 'function') {
    throw new TypeError(`Expected 'sortCompareFn' to be a function, got ${typeof sortCompareFn}`);
  }

  if ((filterFn as unknown) !== undefined && typeof filterFn !== 'function') {
    throw new TypeError(`Expected 'filterFn' to be a function, got ${typeof filterFn}`);
  }

  return {
    workingDir,
    templateFn,
    templateData,
    sortCompareFn,
    filterFn,
    before,
    after,
    delimiter,
  };
}
