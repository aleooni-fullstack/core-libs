import { describe, it, expect } from 'vitest';
import { Guard, IGuardArgument } from './Guard';

describe('Guard unit tests', () => {
  it('Test greaterThan success', () => {
    const result = Guard.greaterThan(5, 6);

    expect(result.succeeded).toBe(true);
  });

  it('Test greaterThan error', () => {
    const result = Guard.greaterThan(5, 4);

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('Number given {4} is not greater than {5}');
  });

  it('Test againstAtLeast success', () => {
    const result = Guard.againstAtLeast(5, 'This text should pass');

    expect(result.succeeded).toBe(true);
  });

  it('Test againstAtLeast error', () => {
    const result = Guard.againstAtLeast(50, 'This text should not pass');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('Text is not at least 50 chars');
  });

  it('Test againstAtMost success', () => {
    const result = Guard.againstAtMost(50, 'This text should pass');

    expect(result.succeeded).toBe(true);
  });

  it('Test againstAtMost error', () => {
    const result = Guard.againstAtMost(5, 'This text should not pass');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('Text is greater than 5 chars');
  });

  it('Test againstNullOrUndefined success', () => {
    const argumentOk = 1;
    const result = Guard.againstNullOrUndefined(argumentOk, 'argumentOk');

    expect(result.succeeded).toBe(true);
  });

  it('Test againstNullOrUndefined null error', () => {
    const result = Guard.againstNullOrUndefined(null, 'argumentNull');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentNull is null or undefined');
  });

  it('Test againstNullOrUndefined undefined error', () => {
    const result = Guard.againstNullOrUndefined(undefined, 'argumentNull');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentNull is null or undefined');
  });

  it('Test againstEmpty success', () => {
    const result = Guard.againstEmpty('this should pass', 'argumentOk');

    expect(result.succeeded).toBe(true);
  });

  it('Test againstEmpty empty error', () => {
    const result = Guard.againstEmpty('', 'argumentEmpty');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentEmpty is empty');
  });

  it('Test againstEmpty only spaces error', () => {
    const result = Guard.againstEmpty('    ', 'argumentSpaces');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentSpaces is empty');
  });

  it('Test againstNullOrUndefinedBulk success', () => {
    const argumentCollection: IGuardArgument[] = [
      {
        argument: 'this is text',
        argumentName: 'textArgument',
      },
      {
        argument: 1,
        argumentName: 'numberArgument',
      },
    ];
    const result = Guard.againstNullOrUndefinedBulk(argumentCollection);

    expect(result.succeeded).toBe(true);
  });

  it('Test againstNullOrUndefinedBulk empty error', () => {
    const argumentCollection: IGuardArgument[] = [
      {
        argument: undefined,
        argumentName: 'textArgument',
      },
      {
        argument: 1,
        argumentName: 'numberArgument',
      },
    ];
    const result = Guard.againstNullOrUndefinedBulk(argumentCollection);

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('textArgument is null or undefined');
  });

  it('Test againstEmptyBulk success', () => {
    const argumentCollection: IGuardArgument[] = [
      {
        argument: 'this is text',
        argumentName: 'textArgument1',
      },
      {
        argument: 'this is another text',
        argumentName: 'textArgument2',
      },
    ];
    const result = Guard.againstEmptyBulk(argumentCollection);

    expect(result.succeeded).toBe(true);
  });

  it('Test againstEmptyBulk empty error', () => {
    const argumentCollection: IGuardArgument[] = [
      {
        argument: '',
        argumentName: 'textArgument1',
      },
      {
        argument: 'this is another text',
        argumentName: 'textArgument2',
      },
    ];
    const result = Guard.againstEmptyBulk(argumentCollection);

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('textArgument1 is empty');
  });

  it('Test againstNotBoolean success', () => {
    const result = Guard.againstNotBoolean(true, 'argumentOk');

    expect(result.succeeded).toBe(true);
  });

  it('Test againstNotBoolean empty error', () => {
    const result = Guard.againstNotBoolean(
      'I am not boolean',
      'argumentNotBoolean',
    );

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentNotBoolean is not boolean');
  });

  it('Test isOneOf success', () => {
    const validValues: any[] = [1, 'I am here', true];
    const result = Guard.isOneOf('I am here', validValues, 'validArgument');

    expect(result.succeeded).toBe(true);
  });

  it('Test isOneOf error', () => {
    const validValues: any[] = [1, 'I am here', true];
    const result = Guard.isOneOf('I am not here', validValues, 'validArgument');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe(
      'validArgument isn\'t oneOf the correct types in [1,"I am here",true]. Got "I am not here"',
    );
  });

  it('Test inRange success', () => {
    const result = Guard.inRange(5, 0, 10, 'argumentValid');

    expect(result.succeeded).toBe(true);
  });

  it('Test inRange error', () => {
    const result = Guard.inRange(11, 0, 10, 'argumentInvalid');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentInvalid is not within range 0 to 10');
  });

  it('Test allInRange success', () => {
    const result = Guard.allInRange([1, 2, 3], 0, 10, 'argumentValid');

    expect(result.succeeded).toBe(true);
  });

  it('Test allInRange error', () => {
    const result = Guard.allInRange([1, 2, 4, 11], 0, 10, 'argumentInvalid');

    expect(result.succeeded).toBe(false);
    expect(result.message).toBe('argumentInvalid is not within the range');
  });
});
