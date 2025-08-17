import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const MAX_HEADER_LENGTH = 160;
const MAX_BODY_LINE_LENGTH = 160;

/**
 * Simbo's shared commitlint configuration.
 *
 * @see {@link https://commitlint.js.org/ Website}
 * @see {@link https://commitlint.js.org/reference/configuration.html Configuration}
 * @see {@link https://commitlint.js.org/reference/rules.html Rules}
 */
export const config: UserConfig = {
  // Extend the conventional commit config
  extends: ['@commitlint/config-conventional'],

  // Customized rules
  rules: {
    // Increase the maximum length of the header to 160 characters
    'header-max-length': [RuleConfigSeverity.Error, 'always', MAX_HEADER_LENGTH],
    'body-max-line-length': [RuleConfigSeverity.Error, 'always', MAX_BODY_LINE_LENGTH],
  },

  // Ignore certain commit messages
  ignores: [
    // Ignore automated commits
    (commit: string): boolean => /^(?:Merge|Revert)\s/.test(commit),
  ],
};
