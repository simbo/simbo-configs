import { describe, expect, it, vi } from 'vitest';

import { hintToHelp } from './hint-to-help.js';

vi.mock('node:path', async () => {
  const actual = await vi.importActual<typeof import('node:path')>('node:path');
  return {
    basename: vi.fn().mockImplementation((path: string) => actual.basename(path)),
  };
});

vi.mock('node:process', () => ({
  argv: ['node', './path/to/test.js'],
}));

vi.mock('yoctocolors', () => ({
  yellow: (text: string) => `[yellow]${text}[/yellow]`,
}));

describe('hintToHelp', () => {
  it('should output a hint to help with the detected command name', () => {
    expect(hintToHelp()).toBe(`Run [yellow]test.js --help[/yellow] for usage information.`);
  });

  it('should output a hint to help with the specified command name', () => {
    expect(hintToHelp('my-command')).toBe(`Run [yellow]my-command --help[/yellow] for usage information.`);
  });
});
