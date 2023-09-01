export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static greaterThan(
    minValue: number,
    actualValue: number,
  ): IGuardResult {
    const returnSucceeded = { succeeded: true };
    const returnUnsucceeded = {
      succeeded: false,
      message: `Number given {${actualValue}} is not greater than {${minValue}}`,
    };

    return actualValue > minValue ? returnSucceeded : returnUnsucceeded;
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    const returnSucceeded = { succeeded: true };
    const returnUnsucceeded = {
      succeeded: false,
      message: `Text is not at least ${numChars} chars.`,
    };

    return text.length >= numChars ? returnSucceeded : returnUnsucceeded;
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    const returnSucceeded = { succeeded: true };
    const returnUnsucceeded = {
      succeeded: false,
      message: `Text is greater than ${numChars} chars.`,
    };

    return text.length <= numChars ? returnSucceeded : returnUnsucceeded;
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    } else {
      return { succeeded: true };
    }
  }

  public static againstEmpty(
    argument: string,
    argumentName: string,
  ): IGuardResult {
    if (!argument || argument.trim() === '') {
      return {
        succeeded: false,
        message: `${argumentName} is empty`,
      };
    } else {
      return { succeeded: true };
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static againstEmptyBulk(args: GuardArgumentCollection): IGuardResult {
    for (const arg of args) {
      const result = this.againstEmpty(
        arg.argument as string,
        arg.argumentName,
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static isOneOf(
    value: any,
    validValues: any[],
    argumentName: string,
  ): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true };
    } else {
      return {
        succeeded: false,
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
          validValues,
        )}. Got "${value}".`,
      };
    }
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    } else {
      return { succeeded: true };
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    let failingResult: IGuardResult | null = null;
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    } else {
      return { succeeded: true };
    }
  }

  public static againstNotBoolean(
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (typeof argument !== 'boolean') {
      return { succeeded: false, message: `${argumentName} is not boolean` };
    } else {
      return { succeeded: true };
    }
  }
}
