/**
 * The options for the UserFacingError.
 * It can include a hint string to help the user resolve the issue.
 * The hint option can also be `true` to indicate that a generic hint should be shown.
 * It extends the standard ErrorOptions.
 */
export interface Options extends ErrorOptions {
  hint?: string | boolean;
}

/**
 * The type for second parameter for UserFacingError.
 * It can be a string, a boolean, or an object with additional options.
 */
export type SecondParam = string | boolean | Options;

/**
 * The type for the value of the hint in UserFacingError.
 * It can be a string, a boolean, or undefined.
 */
export type Hint = string | true | undefined;
