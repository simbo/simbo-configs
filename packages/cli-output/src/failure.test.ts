import { describe, expect, it, vi } from 'vitest';

import { failure } from './failure.js';

vi.mock('yoctocolors', () => ({
  red: (text: string) => `[red]${text}[/red]`,
}));

describe('failure', () => {
  it('should output the message prefixed with a red X icon', () => {
    expect(failure('Test message')).toBe('[red]✖[/red] Test message');
  });
});
