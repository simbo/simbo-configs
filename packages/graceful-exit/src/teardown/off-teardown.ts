import { teardownSteps } from './teardown-steps.js';
import type { TeardownStep } from './teardown.types.js';

/**
 * Unregister a teardown step.
 *
 * @param step - The teardown step to unregister.
 */
export function offTeardown(step: TeardownStep): void {
  teardownSteps.delete(step);
}
