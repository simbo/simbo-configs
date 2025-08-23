import type { TeardownStep } from './teardown.types.js';

/**
 * The registered teardown steps.
 */
export const teardownSteps = new Set<TeardownStep>();
