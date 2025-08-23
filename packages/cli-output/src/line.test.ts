import { describe, expect, it, vi } from 'vitest';

import { line } from './line.js';

vi.mock('node:process', () => ({
  stdout: { columns: 128 },
}));

const { stdout } = vi.mocked(await import('node:process'));

describe('line', () => {
  it('should output a line of the default width', () => {
    expect(line()).toBe('─'.repeat(80));
  });

  it('should output a line of the specified width', () => {
    expect(line(100)).toBe('─'.repeat(100));
  });

  it('should not exceed the stdout width', () => {
    expect(line(200)).toBe('─'.repeat(128));
  });

  it('should take stdout width over the default width', () => {
    stdout.columns = 40;
    expect(line(200)).toBe('─'.repeat(40));
  });
});
