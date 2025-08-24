import { describe, expect, it } from 'vitest';

import type { ClirkContextWithoutMessages } from '../clirk.types.js';

import { generateVersionMessage } from './generate-version-message.js';

describe('generateVersionMessage', () => {
  it('returns the name and version string', () => {
    const context = {
      package: {
        packageJson: {
          name: 'my-cli',
          version: '1.0.0',
        },
      },
    };

    expect(generateVersionMessage(context as unknown as ClirkContextWithoutMessages)).toBe('my-cli v1.0.0');
  });
});
