import type { WorkspaceMetadata } from '@simbo/monorepo-utils';
import { describe, expect, it } from 'vitest';

import { defaultBeforeFn } from './default-before-fn.js';

describe('defaultBeforeFn', () => {
  it('should generate the correct default before text', () => {
    const workspaces = [{ name: 'pkg-a' }, { name: 'pkg-b' }];
    const result = defaultBeforeFn(workspaces as unknown as WorkspaceMetadata[]);
    expect(result).toBe('There are currently _**2**_ packages managed in this repository:\n\n');
  });

  it('should generate the correct default prefix for a single workspace', () => {
    const workspaces = [{ name: 'pkg-a' }];
    const result = defaultBeforeFn(workspaces as unknown as WorkspaceMetadata[]);
    expect(result).toBe('There is currently _**1**_ package managed in this repository:\n\n');
  });
});
