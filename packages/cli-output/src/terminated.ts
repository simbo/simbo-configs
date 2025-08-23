import { dim } from 'yoctocolors';

/**
 * A termination message prefixed with a skull emoji.
 *
 * @param causeOfDeath - The reason for termination.
 * @returns A formatted termination message.
 */
export function terminated(causeOfDeath: string): string {
  return `💀 Terminated. ${dim(`(${causeOfDeath})`)}`;
}
