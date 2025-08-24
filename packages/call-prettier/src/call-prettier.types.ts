/**
 * Options for calling Prettier.
 */
export interface Options {
  /**
   * The working directory to run Prettier in.
   * If not specified, the current working directory will be used.
   *
   * @default process.cwd()
   */
  workingDir?: string;

  /**
   * The path to the Prettier binary.
   * If not specified, it will be found using `findBin`.
   *
   * @default await findBin('prettier', { workingDir })
   */
  binPath?: string;

  /**
   * The mode to run Prettier in.
   * If not specified, 'write' mode will be used.
   *
   * @default 'write'
   */
  mode?: 'write' | 'check';

  /**
   * Whether to disable ignore patterns defined in the respective context.
   * If not specified, ignore patterns will be respected.
   *
   * @default false
   */
  disableIgnores?: boolean;

  /**
   * Whether to throw an error if the Prettier binary is not found.
   *
   * @default true
   */
  throwIfNotFound?: boolean;
}
