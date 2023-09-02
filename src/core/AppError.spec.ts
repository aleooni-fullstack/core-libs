import { describe, it, expect } from 'vitest';
import { AppError } from './AppError';

describe('AppError unit tests', () => {
  it('Should be defined', () => {
    const newError = AppError.UnexpectedError.create('New Error');
    expect(newError).toBeDefined();
  });

  it('isFailure should be true', () => {
    const newError = AppError.UnexpectedError.create('New Error');
    expect(newError.isFailure).toBe(true);
  });

  it('isSuccess should be false', () => {
    const newError = AppError.UnexpectedError.create('New Error');
    expect(newError.isSuccess).toBe(false);
  });

  it('Should be output generic error message', () => {
    const newError = AppError.UnexpectedError.create('New Error');
    expect(newError.errorValue().message).toBe('An unexpected error occurred.');
  });
});
