import { describe, expect, it } from 'vitest';

import { UserFacingError } from './user-facing-error.js';

describe('UserFacingError', () => {
  it('sets name to "UserFacingError"', () => {
    const error = new UserFacingError('something failed');
    expect(error.name).toBe('UserFacingError');
  });

  it('sets the message correctly', () => {
    const message = 'invalid input';
    const error = new UserFacingError(message);
    expect(error.message).toBe(message);
  });

  it('can include a hint string', () => {
    const error = new UserFacingError('something', 'check input format');
    expect(error.hint).toBe('check input format');
  });

  it('can include a generic hint', () => {
    const error = new UserFacingError('something else', true);
    expect(error.hint).toBe(true);
  });

  it('is an instance of Error and UserFacingError', () => {
    const error = new UserFacingError('test');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(UserFacingError);
  });

  it('can handle ErrorOptions', () => {
    const options = { cause: new Error('cause error') };
    const error = new UserFacingError('with options', options);
    expect(error.cause).toBe(options.cause);
  });

  it('can handle string hint in ErrorOptions', () => {
    const options = { hint: 'use --help' };
    const error = new UserFacingError('with string hint', options);
    expect(error.hint).toBe('use --help');
  });

  it('can handle boolean hint in ErrorOptions', () => {
    const options = { hint: true };
    const error = new UserFacingError('with boolean hint', options);
    expect(error.hint).toBe(true);
  });

  describe('UserFacingError.from', () => {
    it('can create from another error', () => {
      const originalError = new Error('original error');
      const userFacingError = UserFacingError.from(originalError, 'wrapped error');
      expect(userFacingError.message).toBe('wrapped error (original error)');
      expect(userFacingError.cause).toBe(originalError);
    });

    it('supports string hint option when creating from another error', () => {
      const originalError = new Error('original error');
      const userFacingError = UserFacingError.from(originalError, 'wrapped error', 'check input');
      expect(userFacingError.hint).toBe('check input');
    });

    it('supports boolean hint option when creating from another error', () => {
      const originalError = new Error('original error');
      const userFacingError = UserFacingError.from(originalError, 'wrapped error', true);
      expect(userFacingError.hint).toBe(true);
    });

    it('supports object hint option when creating from another error', () => {
      const originalError = new Error('original error');
      const userFacingError = UserFacingError.from(originalError, 'wrapped error', { hint: 'use --help' });
      expect(userFacingError.hint).toBe('use --help');
    });

    it('supports creating from a non-Error object with message', () => {
      const nonErrorObject = { message: 'not an error' };
      const userFacingError = UserFacingError.from(nonErrorObject, 'wrapped non-error');
      expect(userFacingError.message).toBe('wrapped non-error (not an error)');
      expect(userFacingError.hint).toBeUndefined();
    });

    it('handles non-object errors gracefully', () => {
      const userFacingError = UserFacingError.from('string error', 'wrapped string error');
      expect(userFacingError.message).toBe('wrapped string error (string error)');
      expect(userFacingError.hint).toBeUndefined();
    });
  });
});
