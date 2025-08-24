import { globbyStream, type Options as GlobbyOptions } from 'globby';

export type MatcherFunction = (path: string) => boolean | Promise<boolean>;

export interface Options extends GlobbyOptions {
  matcher?: MatcherFunction;
}

/**
 * Glob using globby and exit early if there are any findings.
 *
 * Returns `true` if any file matches the given glob pattern(s).
 *
 * If a `matcher` function is provided, it will be used to filter the stream result.
 *
 * @param patterns - A glob pattern or list of patterns.
 * @param options - Optional globby options and a matcher function.
 * @returns A boolean indicating whether any matching file was found.
 */
export async function globbyHasMatches(patterns: string | string[], options: Options = {}): Promise<boolean> {
  const { matcher, ...globbyOptions } = options;

  for await (const data of globbyStream(patterns, globbyOptions)) {
    const path = typeof data === 'string' ? data : String(data);
    if (typeof matcher === 'function') {
      if (await matcher(path)) {
        return true;
      }
    } else {
      return true;
    }
  }

  return false;
}
