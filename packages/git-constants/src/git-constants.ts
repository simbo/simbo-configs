/**
 * The default branch name for Git repositories.
 */
export const GIT_DEFAULT_BRANCH = 'main';

/**
 * The name of the Git folder that indicates a directory is a Git repository.
 */
export const GIT_FOLDER = '.git';

/**
 * The prefix for Git references, which includes branches, remotes, tags, and pulls.
 */
export const GIT_REFS_PREFIX = 'refs/';

/**
 * The prefix for Git references related to branches.
 */
export const GIT_REFS_HEADS_PREFIX = `${GIT_REFS_PREFIX}heads/`;

/**
 * The prefix for Git references related to remotes.
 */
export const GIT_REFS_REMOTES_PREFIX = `${GIT_REFS_PREFIX}remotes/`;

/**
 * The prefix for Git references related to tags.
 */
export const GIT_REFS_TAGS_PREFIX = `${GIT_REFS_PREFIX}tags/`;

/**
 * The prefix for Git references related to pull requests.
 */
export const GIT_REFS_PULLS_PREFIX = `${GIT_REFS_PREFIX}pulls/`;

/**
 * The suffix for Git references related to pull requests.
 */
export const GIT_REFS_PULLS_SUFFIX = `/merge`;

/**
 * The length of the short SHA used in Git commit references.
 */
export const GIT_SHA_SHORT_LENGTH = 7;
