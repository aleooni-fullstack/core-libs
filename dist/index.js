"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AggregateRoot: () => AggregateRoot,
  AppError: () => AppError,
  Changes: () => Changes,
  DomainEmitter: () => DomainEmitter,
  DomainEvents: () => DomainEvents,
  Entity: () => Entity,
  Guard: () => Guard,
  Identifier: () => Identifier,
  Left: () => Left,
  Result: () => Result,
  Right: () => Right,
  UniqueEntityID: () => UniqueEntityID,
  UseCaseError: () => UseCaseError,
  ValueObject: () => ValueObject,
  WatchedList: () => WatchedList,
  delay: () => delay,
  left: () => left,
  right: () => right
});
module.exports = __toCommonJS(src_exports);

// src/core/Result.ts
var Result = class _Result {
  isSuccess;
  isFailure;
  error;
  _value;
  constructor(isSuccess, error, value) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error"
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error message"
      );
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
    Object.freeze(this);
  }
  getValue() {
    if (!this.isSuccess) {
      console.log(this.error);
      console.log(this.errorValue());
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }
    return this._value;
  }
  errorValue() {
    return this.error;
  }
  static ok(value) {
    return new _Result(true, void 0, value);
  }
  static fail(error) {
    return new _Result(false, error);
  }
  static combine(results) {
    for (const result of results) {
      if (result.isFailure)
        return result;
    }
    return _Result.ok();
  }
};
var Left = class {
  value;
  constructor(value) {
    this.value = value;
  }
  isLeft() {
    return true;
  }
  isRight() {
    return false;
  }
};
var Right = class {
  value;
  constructor(value) {
    this.value = value;
  }
  isLeft() {
    return false;
  }
  isRight() {
    return true;
  }
};
var left = (l) => {
  return new Left(l);
};
var right = (a) => {
  return new Right(a);
};

// src/core/AppError.ts
var AppError;
((AppError2) => {
  class UnexpectedError extends Result {
    constructor(err) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      });
      console.log(`[AppError]: An unexpected error occurred`);
      console.log(err.message);
    }
    static create(err) {
      return new UnexpectedError(err);
    }
  }
  AppError2.UnexpectedError = UnexpectedError;
})(AppError || (AppError = {}));

// src/core/Guard.ts
var Guard = class {
  static combine(guardResults) {
    for (const result of guardResults) {
      if (result.succeeded === false)
        return result;
    }
    return { succeeded: true };
  }
  static greaterThan(minValue, actualValue) {
    const returnSucceeded = { succeeded: true };
    const returnUnsucceeded = {
      succeeded: false,
      message: `Number given {${actualValue}} is not greater than {${minValue}}`
    };
    return actualValue > minValue ? returnSucceeded : returnUnsucceeded;
  }
  static againstAtLeast(numChars, text) {
    const returnSucceeded = { succeeded: true };
    const returnUnsucceeded = {
      succeeded: false,
      message: `Text is not at least ${numChars} chars.`
    };
    return text.length >= numChars ? returnSucceeded : returnUnsucceeded;
  }
  static againstAtMost(numChars, text) {
    const returnSucceeded = { succeeded: true };
    const returnUnsucceeded = {
      succeeded: false,
      message: `Text is greater than ${numChars} chars.`
    };
    return text.length <= numChars ? returnSucceeded : returnUnsucceeded;
  }
  static againstNullOrUndefined(argument, argumentName) {
    if (argument === null || argument === void 0) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`
      };
    } else {
      return { succeeded: true };
    }
  }
  static againstEmpty(argument, argumentName) {
    if (!argument || argument.trim() === "") {
      return {
        succeeded: false,
        message: `${argumentName} is empty`
      };
    } else {
      return { succeeded: true };
    }
  }
  static againstNullOrUndefinedBulk(args) {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded)
        return result;
    }
    return { succeeded: true };
  }
  static againstEmptyBulk(args) {
    for (const arg of args) {
      const result = this.againstEmpty(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded)
        return result;
    }
    return { succeeded: true };
  }
  static isOneOf(value, validValues, argumentName) {
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
          validValues
        )}. Got "${value}".`
      };
    }
  }
  static inRange(num, min, max, argumentName) {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`
      };
    } else {
      return { succeeded: true };
    }
  }
  static allInRange(numbers, min, max, argumentName) {
    let failingResult = null;
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded)
        failingResult = numIsInRangeResult;
    }
    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`
      };
    } else {
      return { succeeded: true };
    }
  }
  static againstNotBoolean(argument, argumentName) {
    if (typeof argument !== "boolean") {
      return { succeeded: false, message: `${argumentName} is not boolean` };
    } else {
      return { succeeded: true };
    }
  }
};

// src/core/UseCaseError.ts
var UseCaseError = class {
  message;
  constructor(message) {
    this.message = message;
  }
};

// src/core/WithChanges.ts
var Changes = class {
  changes;
  constructor() {
    this.changes = [];
  }
  addChange(result) {
    this.changes.push(result);
  }
  getChangeResult() {
    return Result.combine(this.changes);
  }
};

// src/domain/UniqueEntityID.ts
var import_crypto = __toESM(require("crypto"));

// src/domain/Identifier.ts
var Identifier = class {
  constructor(value) {
    this.value = value;
    this.value = value;
  }
  equals(id) {
    if (id === null || id === void 0) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }
  toString() {
    return String(this.value);
  }
  toValue() {
    return this.value;
  }
};

// src/domain/UniqueEntityID.ts
var UniqueEntityID = class extends Identifier {
  constructor(id) {
    super(id || import_crypto.default.randomUUID());
  }
};

// src/domain/Entity.ts
var isEntity = (v) => {
  return v instanceof Entity;
};
var Entity = class {
  _id;
  props;
  constructor(props, id) {
    this._id = id || new UniqueEntityID();
    this.props = props;
  }
  equals(object) {
    if (object == null || object === void 0) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }
    return this._id.equals(object._id);
  }
};

// src/domain/events/DomainEvents.ts
var DomainEvents = class {
  static handlersMap = {};
  static markedAggregates = [];
  static markAggregateForDispatch(aggregate) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }
  static dispatchAggregateEvents(aggregate) {
    aggregate.domainEvents.forEach(
      (event) => this.dispatch(event)
    );
  }
  static removeAggregateFromMarkedDispatchList(aggregate) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }
  static findMarkedAggregateByID(id) {
    let found = null;
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }
    return found;
  }
  static dispatchEventsForAggregate(id) {
    const aggregate = this.findMarkedAggregateByID(id);
    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }
  static register(callback, eventClassName) {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }
  static clearHandlers() {
    this.handlersMap = {};
  }
  static clearMarkedAggregates() {
    this.markedAggregates = [];
  }
  static dispatch(event) {
    const eventClassName = event.constructor.name;
    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
};

// src/domain/AggregateRoot.ts
var AggregateRoot = class extends Entity {
  _domainEvents = [];
  get id() {
    return this._id;
  }
  get domainEvents() {
    return this._domainEvents;
  }
  addDomainEvent(domainEvent) {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }
  clearEvents() {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
  logDomainEventAdded(domainEvent) {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      "==>",
      domainEventClass.constructor.name
    );
  }
};

// src/domain/ValueObject.ts
var ValueObject = class {
  props;
  constructor(props) {
    const baseProps = {
      ...props
    };
    this.props = baseProps;
  }
  equals(vo) {
    if (vo === null || vo === void 0) {
      return false;
    }
    if (vo.props === void 0) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
};

// src/domain/WatchedList.ts
var WatchedList = class {
  currentItems;
  initial;
  new;
  removed;
  constructor(initialItems) {
    this.currentItems = initialItems || [];
    this.initial = initialItems || [];
    this.new = [];
    this.removed = [];
  }
  getItems() {
    return this.currentItems;
  }
  getNewItems() {
    return this.new;
  }
  getRemovedItems() {
    return this.removed;
  }
  isCurrentItem(item) {
    return this.currentItems.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  isNewItem(item) {
    return this.new.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  isRemovedItem(item) {
    return this.removed.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  removeFromNew(item) {
    this.new = this.new.filter((v) => !this.compareItems(v, item));
  }
  removeFromCurrent(item) {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v)
    );
  }
  removeFromRemoved(item) {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v));
  }
  wasAddedInitially(item) {
    return this.initial.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  exists(item) {
    return this.isCurrentItem(item);
  }
  add(item) {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }
    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }
    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }
  remove(item) {
    this.removeFromCurrent(item);
    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }
    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }
  clean() {
    this.currentItems = [];
    this.initial = [];
    this.new = [];
    this.removed = [];
  }
};

// src/domain/events/EventEmitter.ts
var import_events = require("events");
var DomainEmitter = class extends import_events.EventEmitter {
  constructor() {
    super();
  }
};

// src/util/delay.ts
async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AggregateRoot,
  AppError,
  Changes,
  DomainEmitter,
  DomainEvents,
  Entity,
  Guard,
  Identifier,
  Left,
  Result,
  Right,
  UniqueEntityID,
  UseCaseError,
  ValueObject,
  WatchedList,
  delay,
  left,
  right
});
