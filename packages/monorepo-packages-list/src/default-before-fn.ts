import type { WorkspaceMetadata } from '@simbo/monorepo-utils';

/**
 * Generates a section to insert before for the package list.
 *
 * @param workspaces - The list of workspaces in the monorepo.
 * @returns The default before string.
 */
export function defaultBeforeFn(workspaces: WorkspaceMetadata[]): string {
  const count = workspaces.length;
  return `There ${count === 1 ? 'is' : 'are'} currently _**${count}**_ package${count === 1 ? '' : 's'} managed in this repository:\n\n`;
}
