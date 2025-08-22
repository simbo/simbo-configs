import type { Linter } from 'eslint';

/**
 * A config object export in `@simbo/eslint-config`.
 *
 * This interface defines the structure of the ESLint configuration objects
 * that are exported from the various config files in the package.
 */
export interface ConfigsRecord {
  /**
   * ESLint configurations for Node.js projects.
   */
  node: {
    /**
     * A recommended ESLint config for Node.js projects.
     */
    recommended: Linter.Config[];
  };

  /**
   * ESLint configurations for browser projects.
   */
  browser: {
    /**
     * A recommended ESLint config for browser projects.
     */
    recommended: Linter.Config[];
  };
}
