import { EventEmitter } from 'events';

declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: T | string | undefined;
    private _value;
    constructor(isSuccess: boolean, error?: T | string, value?: T);
    getValue(): T;
    errorValue(): T;
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: string): Result<U>;
    static combine(results: Result<any>[]): Result<any>;
}
declare class Left<L, A> {
    readonly value: L;
    constructor(value: L);
    isLeft(): this is Left<L, A>;
    isRight(): this is Right<L, A>;
}
declare class Right<L, A> {
    readonly value: A;
    constructor(value: A);
    isLeft(): this is Left<L, A>;
    isRight(): this is Right<L, A>;
}
type Either<L, A> = Left<L, A> | Right<L, A>;
declare const left: <L, A>(l: L) => Either<L, A>;
declare const right: <L, A>(a: A) => Either<L, A>;

interface IUseCaseError {
    message: string;
}
declare abstract class UseCaseError implements IUseCaseError {
    readonly message: string;
    constructor(message: string);
}

declare namespace AppError {
    class UnexpectedError extends Result<UseCaseError> {
        constructor(err: Error);
        static create(err: any): UnexpectedError;
    }
}

interface IGuardResult {
    succeeded: boolean;
    message?: string;
}
interface IGuardArgument {
    argument: any;
    argumentName: string;
}
type GuardArgumentCollection = IGuardArgument[];
declare class Guard {
    static combine(guardResults: IGuardResult[]): IGuardResult;
    static greaterThan(minValue: number, actualValue: number): IGuardResult;
    static againstAtLeast(numChars: number, text: string): IGuardResult;
    static againstAtMost(numChars: number, text: string): IGuardResult;
    static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult;
    static againstEmpty(argument: string, argumentName: string): IGuardResult;
    static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult;
    static againstEmptyBulk(args: GuardArgumentCollection): IGuardResult;
    static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult;
    static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult;
    static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult;
    static againstNotBoolean(argument: any, argumentName: string): IGuardResult;
}

interface UseCase<IRequest, IResponse> {
    execute(request?: IRequest): Promise<IResponse> | IResponse;
}

declare class Changes {
    private changes;
    constructor();
    addChange(result: Result<any>): void;
    getChangeResult(): Result<any>;
}
interface WithChanges {
    changes: Changes;
}

interface StaticGenerationService<IRequest, IResponse> {
    execute(request: IRequest): Promise<IResponse> | IResponse;
}

declare class Identifier<T> {
    private value;
    constructor(value: T);
    equals(id?: Identifier<T>): boolean;
    toString(): string;
    toValue(): T;
}

declare class UniqueEntityID extends Identifier<string | number> {
    constructor(id?: string | number);
}

declare abstract class Entity<T> {
    protected readonly _id: UniqueEntityID;
    readonly props: T;
    constructor(props: T, id?: UniqueEntityID);
    equals(object?: Entity<T>): boolean;
}

interface IDomainEvent {
    dateTimeOccurred: Date;
    getAggregateId(): UniqueEntityID | number;
}

declare abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents;
    get id(): UniqueEntityID;
    get domainEvents(): IDomainEvent[];
    protected addDomainEvent(domainEvent: IDomainEvent): void;
    clearEvents(): void;
    private logDomainEventAdded;
}

interface DomainService {
}

interface ValueObjectProps {
    [index: string]: any;
}
declare abstract class ValueObject<T extends ValueObjectProps> {
    props: T;
    constructor(props: T);
    equals(vo?: ValueObject<T>): boolean;
}

declare abstract class WatchedList<T> {
    currentItems: T[];
    private initial;
    private new;
    private removed;
    constructor(initialItems?: T[]);
    abstract compareItems(a: T, b: T): boolean;
    getItems(): T[];
    getNewItems(): T[];
    getRemovedItems(): T[];
    private isCurrentItem;
    private isNewItem;
    private isRemovedItem;
    private removeFromNew;
    private removeFromCurrent;
    private removeFromRemoved;
    private wasAddedInitially;
    exists(item: T): boolean;
    add(item: T): void;
    remove(item: T): void;
    clean(): void;
}

declare class DomainEvents {
    private static handlersMap;
    private static markedAggregates;
    static markAggregateForDispatch(aggregate: AggregateRoot<any>): void;
    private static dispatchAggregateEvents;
    private static removeAggregateFromMarkedDispatchList;
    private static findMarkedAggregateByID;
    static dispatchEventsForAggregate(id: UniqueEntityID): void;
    static register(callback: (event: IDomainEvent) => void, eventClassName: string): void;
    static clearHandlers(): void;
    static clearMarkedAggregates(): void;
    private static dispatch;
}

declare class DomainEmitter extends EventEmitter {
    constructor();
}

interface IHandle<IDomainEvent> {
    setupSubscriptions(): void;
}

interface Mapper<T> {
}

declare function delay(time: number): Promise<void>;

export { AggregateRoot, AppError, Changes, DomainEmitter, DomainEvents, DomainService, Either, Entity, Guard, GuardArgumentCollection, IDomainEvent, IGuardArgument, IGuardResult, IHandle, Identifier, Left, Mapper, Result, Right, StaticGenerationService, UniqueEntityID, UseCase, UseCaseError, ValueObject, WatchedList, WithChanges, delay, left, right };
