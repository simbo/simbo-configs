import { teardownSteps } from './teardown-steps.js';
import type { TeardownStep } from './teardown.types.js';

/**
 * Register a teardown step to be run on process exit.
 *
 * @param step - The teardown step to register.
 */
export function onTeardown(step: TeardownStep): void {
  teardownSteps.add(step);
}
