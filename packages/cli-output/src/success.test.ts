import { describe, expect, it, vi } from 'vitest';

import { success } from './success.js';

vi.mock('yoctocolors', () => ({
  green: (text: string) => `[green]${text}[/green]`,
}));

describe('success', () => {
  it('should output the message prefixed with a green checkmark', () => {
    expect(success('Test message')).toBe('[green]✔[/green] Test message');
  });
});
