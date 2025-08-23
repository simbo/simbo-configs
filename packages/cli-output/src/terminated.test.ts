import { describe, expect, it, vi } from 'vitest';

import { terminated } from './terminated.js';

vi.mock('yoctocolors', () => ({
  dim: (text: string) => `[dimmed]${text}[/dimmed]`,
}));

describe('terminated', () => {
  it('should output the message in parentheses after a termination message', () => {
    expect(terminated('Reason')).toBe('💀 Terminated. [dimmed](Reason)[/dimmed]');
  });
});
