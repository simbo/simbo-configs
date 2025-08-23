import { describe, expect, it } from 'vitest';

import { stringifyError } from './stringify-error.js';

describe('stringifyError', () => {
  it('returns "Unknown Error (null)" for null', () => {
    expect(stringifyError(null)).toBe('Unknown Error (null)');
  });

  it('returns "Unknown Error (undefined)" for undefined', () => {
    expect(stringifyError(undefined)).toBe('Unknown Error (undefined)');
  });

  it('returns "Unknown Error (true)" for boolean', () => {
    expect(stringifyError(true)).toBe('Unknown Error (true)');
  });

  it('returns "Unknown Error (42)" for number', () => {
    expect(stringifyError(42)).toBe('Unknown Error (42)');
  });

  it('returns "Unknown Error (123n)" for bigint', () => {
    expect(stringifyError(123n)).toBe('Unknown Error (123)');
  });

  it('returns "Unknown Error (Symbol(test))" for symbol', () => {
    expect(stringifyError(Symbol('test'))).toBe('Unknown Error (Symbol(test))');
  });

  it('returns "Unknown Error (function)" for function', () => {
    const fn = (): void => {};
    expect(stringifyError(fn)).toBe(`Unknown Error (${String(fn)})`);
  });

  it('returns "Unknown Error ("")" for empty string', () => {
    expect(stringifyError('')).toBe('Unknown Error ("")');
  });

  it('returns string as-is', () => {
    expect(stringifyError('Just a string')).toBe('Just a string');
  });

  it('returns message if object has message but no stack', () => {
    const errorLike = { message: 'Oops' };
    expect(stringifyError(errorLike)).toBe('Oops');
  });

  it('returns result of toString() if present and valid', () => {
    const customError = {
      toString: () => 'Custom toString message',
    };
    expect(stringifyError(customError)).toBe('Custom toString message');
  });

  it('returns JSON string if object has no stack, message, or toString', () => {
    const errorLike = Object.create(null) as object;
    Object.assign(errorLike, { foo: 'bar' });
    expect(stringifyError(errorLike)).toBe('Unknown Error ({"foo":"bar"})');
  });

  it('omits non-enumerable properties in JSON string', () => {
    const errorLike = Object.create(null) as object;
    Object.defineProperty(errorLike, 'nonEnumerable', {
      value: 'This is non-enumerable',
      enumerable: false,
    });
    expect(stringifyError(errorLike)).toBe('Unknown Error ({})');
  });

  it('returns JSON string for an object with no properties', () => {
    const emptyObject = {};
    expect(stringifyError(emptyObject)).toBe('Unknown Error ({})');
  });

  it('returns JSON string for an array', () => {
    const array = [1, 'two', 3];
    expect(stringifyError(array)).toBe('Unknown Error ([1,"two",3])');
  });

  it('gracefully handles circular references', () => {
    const circularReference: Record<string, unknown> = {};
    circularReference.self = circularReference;
    expect(stringifyError(circularReference)).toBe('Unknown Error (Failed to stringify the error object.)');
  });

  it('should fallback to a message for non-serializable errors', () => {
    // eslint-disable-next-line unicorn/error-message
    const unknownError = new Error(undefined);
    expect(stringifyError(unknownError)).toBe('Unknown Error (N/A)');
  });
});
