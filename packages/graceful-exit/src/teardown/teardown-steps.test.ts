import { describe, expect, it } from 'vitest';

import { teardownSteps } from './teardown-steps.js';

describe('teardownSteps', () => {
  it('provides a Set of teardown steps', () => {
    expect(teardownSteps).toBeInstanceOf(Set);
  });
});
