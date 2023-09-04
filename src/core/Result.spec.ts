import { describe, it, expect } from 'vitest';
import { Left, Result, Right, Either, left, right } from './Result';

describe('Result unit tests', () => {
  it('Should create class isSuccess=true successfully', () => {
    const result = new Result<string>(true, undefined, 'Ok');

    expect(result.isSuccess).toBeTruthy();
  });

  it('Should create class isSuccess=false successfully', () => {
    const result = new Result<string>(false, 'Error', 'Ok');

    expect(result.isFailure).toBeTruthy();
  });

  it('Should throw Error if create isSuccess=true and error', () => {
    expect(() => new Result<string>(true, 'anything')).toThrowError();
  });

  it('Should throw Error if create isSuccess=false and not error', () => {
    expect(() => new Result<string>(false, undefined)).toThrowError();
  });

  it('Should return value successfully', () => {
    const result = new Result<string>(true, undefined, 'Ok');

    expect(result.getValue()).toBe('Ok');
  });

  it('Should throw Error if isSuccess=false', () => {
    expect(() =>
      new Result<string>(false, 'Error', 'Ok').getValue(),
    ).toThrowError();
  });

  it('Should return error successfully', () => {
    const result = new Result<string>(false, 'Error');

    expect(result.errorValue()).toBe('Error');
  });

  it('Should return undefined for errorValue', () => {
    const result = new Result<string>(true, undefined);

    expect(result.errorValue()).toBe(undefined);
  });

  it('Should return ok successfully', () => {
    const success = Result.ok<string>('This is a success message');

    expect(success.isSuccess).toBeTruthy();
    expect(success.isFailure).toBeFalsy();
    expect(success.getValue()).toBe('This is a success message');
  });

  it('Should return fail successfully', () => {
    const success = Result.fail<string>('This is an error message');

    expect(success.isSuccess).toBeFalsy();
    expect(success.isFailure).toBeTruthy();
    expect(success.errorValue()).toBe('This is an error message');
  });

  it('Should combine all results with success and return Result.ok', () => {
    const result1 = new Result(true, undefined, 'Result 1');
    const result2 = new Result(true, undefined, 'Result 2');
    const result3 = new Result(true, undefined, 'Result 3');

    const results: Result<string>[] = [result1, result2, result3];

    expect(Result.combine(results)).toStrictEqual(Result.ok());
  });

  it('Should initialize class Left successfully', () => {
    const leftClass = new Left<string, number>('LEFT');

    expect(leftClass).toBeDefined();
  });

  it('Should return true for isLeft', () => {
    const leftClass = new Left<string, number>('LEFT');

    expect(leftClass.isLeft()).toBeTruthy();
  });

  it('Should return false for isRight', () => {
    const leftClass = new Left<string, number>('LEFT');

    expect(leftClass.isRight()).toBeFalsy();
  });

  it('Should initialize class Right successfully', () => {
    const rightClass = new Right<string, number>(1);

    expect(rightClass).toBeDefined();
  });

  it('Should return false for isLeft', () => {
    const rightClass = new Right<string, number>(1);

    expect(rightClass.isLeft()).toBeFalsy();
  });

  it('Should return true for isRight', () => {
    const rightClass = new Right<string, number>(1);

    expect(rightClass.isRight()).toBeTruthy();
  });

  it('Should initialize class Either with Right class successfully', () => {
    const eitherClass: Either<string, number> = new Right<string, number>(1);

    expect(eitherClass).toBeDefined();
  });

  it('Should initialize class Either with Left class successfully', () => {
    const eitherClass: Either<string, number> = new Left<string, number>(
      'LEFT',
    );

    expect(eitherClass).toBeDefined();
  });

  it('Should test function left', () => {
    const leftFunction = left<string, number>('LEFT');

    expect(leftFunction.isLeft()).toBeTruthy();
    expect(leftFunction.isRight()).toBeFalsy();
    expect(leftFunction.value).toBe('LEFT');
  });

  it('Should test function right', () => {
    const rightFunction = right<string, number>(1);

    expect(rightFunction.isLeft()).toBeFalsy();
    expect(rightFunction.isRight()).toBeTruthy();
    expect(rightFunction.value).toBe(1);
  });
});
