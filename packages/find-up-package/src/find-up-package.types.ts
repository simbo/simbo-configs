import type { WarnFn } from 'normalize-package-data';
import type { PackageJson } from 'type-fest';

/**
 * Options for the findUpPackage function.
 */
export interface Options {
  /**
   * A function that takes a path and a package.json object and
   * returns a boolean indicating whether the package.json matches the criteria.
   * The default function returns true if both the path and package.json are
   * truthy.
   */
  matchFn?: MatchFn;

  /**
   * Whether to normalize the package.json file using npm's
   * normalize-package-data. Defaults to false. Can be set to true or an
   * object with options for the normalize function.
   * Default options are strict:false and warn:console.warn.
   *
   * @see {@link https://www.npmjs.com/package/normalize-package-data normalize-package-data}
   */
  normalize?: boolean | NormalizeOptions;

  /**
   * The directory to start searching from. If not provided, the current working
   * directory will be used.
   */
  workingDir?: string;
}

/**
 * Options for the findUpPackage function when normalization is enabled.
 */
export type OptionsWithNormalize = Options & { normalize: true | NormalizeOptions };

/**
 * Options for the findUpPackage function when normalization is disabled.
 */
export type OptionsWithoutNormalize = Options & { normalize?: false };

/**
 * A function that takes a path and a package.json object and returns a boolean
 * indicating whether the package.json matches the criteria.
 */
export type MatchFn = (result: Package) => boolean | Promise<boolean>;

/**
 * Options for the normalize function.
 */
export interface NormalizeOptions {
  warn?: WarnFn;
  strict?: boolean;
}

/**
 * Result of the findUpPackage function.
 */
export interface Package {
  /**
   * The absolute path to the directory containing the package.json file.
   */
  path: string;

  /**
   * The parsed package.json file.
   */
  packageJson: PackageJson;
}

/**
 * A Package object with a normalized package.json file.
 */
export interface PackageNormalized extends Package {
  packageJson: PackageJsonNormalized;
}

/**
 * A normalized package.json file.
 */
export type PackageJsonNormalized = PackageJson & {
  name: string;
  version: string;
};
