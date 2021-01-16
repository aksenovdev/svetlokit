import type { Writable } from 'svelte/store';
declare type Predicate<T> = (value: T) => boolean;
export interface DelayedWhenOptions<T> {
    predicate?: Predicate<T>;
    delayTime?: number;
}
export declare const delayedWhen: <T>(value: T, options?: DelayedWhenOptions<T>) => Writable<T>;
export declare const delayedWhenNot: typeof delayedWhen;
export {};
