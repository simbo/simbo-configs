const unknownError = (data: string): string => `Unknown Error (${data})`;

/**
 * Stringifies an error for logging or display purposes.
 *
 * @param error - The error to stringify, can be an Error object, string, or any other type.
 * @returns A string representation of the error, including stack trace if available.
 */
export function stringifyError(error: unknown): string {
  let message: string | undefined;

  // Handle error objects.
  if (typeof error === 'object' && error !== null) {
    message = getMessageFromErrorObject(error);
  }

  // Display any non-string or empty string error as unknown error
  else if (typeof error !== 'string' || error === '') {
    const errorString = error === '' ? '""' : String(error);
    message = unknownError(errorString);
  }

  // Otherwise the error must be a non-empty string at this point.
  else {
    message = error;
  }

  // If we have no valid message yet, display an unknown error
  if (typeof message !== 'string' || message === '') {
    message = unknownError('N/A');
  }

  // Return the final message
  return message;
}

/**
 * Gets the error message from an error object.
 *
 * @param error - The error object to extract the message from.
 * @returns The error message, or undefined if not available.
 */
function getMessageFromErrorObject(error: object): string | undefined {
  let message: string | undefined;

  // If it has a message property, use this as message
  if ('message' in error && typeof error.message === 'string') {
    message = error.message;
  }

  // If it has a toString method, call it and use the return value as message
  else if (Object.getOwnPropertyNames(error).includes('toString') && typeof error.toString === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    message = error.toString();
  }

  // Otherwise stringify the object and display as unknown error
  else {
    try {
      message = unknownError(JSON.stringify(error));
    } catch {
      message = unknownError('Failed to stringify the error object.');
    }
  }

  return message;
}
