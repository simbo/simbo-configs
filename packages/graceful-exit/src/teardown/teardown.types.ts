/**
 * An optionally async teardown step.
 */
export type TeardownStep = (code: number, error: unknown) => void | Promise<void>;
