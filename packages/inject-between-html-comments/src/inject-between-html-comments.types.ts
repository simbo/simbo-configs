/**
 * Options for injecting content between HTML comments.
 */
export interface Options {
  /**
   * Whether the injection content should be trimmed.
   *
   * @default true
   */
  trim?: boolean;

  /**
   * The name partial of the injection comment text.
   * Ignored if text is set.
   * If undefined the default base text will be used.
   *
   * @default undefined
   */
  name?: string;

  /**
   * The injection comment text to search for.
   * Either a string or a function that returns a string.
   * The function gets an optional name argument.
   *
   * @default `INJECT:${name}` | 'INJECT'
   */
  text?: TextOption;

  /**
   * If inline is true, the injected content will be added without wrapping it in
   * double line breaks to create a separate markdown block.
   *
   * @default false
   */
  inline?: boolean;
}

/**
 * The text option for the injection comment.
 * Either a string or a function that returns a string.
 */
export type TextOption = string | ((name?: string) => string);
