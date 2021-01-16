import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

type Predicate<T> = (value: T) => boolean;
export interface DelayedWhenOptions<T> {
    predicate?: Predicate<T>;
    delayTime?: number;
}

const DEFAULT_PREDICATE: Predicate<any> = (value: any) => !!value;
export const delayedWhen: <T>(value: T, options?: DelayedWhenOptions<T>) => Writable<T>
    = <T>(
        value: T,
        { predicate = DEFAULT_PREDICATE, delayTime = 300 }: DelayedWhenOptions<T> = {}
    ) => {
        const { subscribe, set, update }: Writable<T> = writable(value);
        let timeoutId;

        const delayedSet: typeof set
            = (value: T) => {
                clearTimeout(timeoutId);
                if (predicate(value)) {
                    timeoutId = setTimeout(
                        () => set(value),
                        delayTime
                    );
                } else {
                    set(value);
                }
            };
        const delayedUpdate: typeof update
            = update.bind({ set: delayedSet });

        return {
            subscribe,
            set: delayedSet,
            update: delayedUpdate
        };
    };
export const delayedWhenNot: typeof delayedWhen
    = <T>(value: T, options?: DelayedWhenOptions<T>) => {
        const originalPredicate: Predicate<T> = options?.predicate || DEFAULT_PREDICATE;
        const invertedPredicate: Predicate<T> = (value: T) => !originalPredicate(value);

        return delayedWhen(value, { ...(options || {}), predicate: invertedPredicate });
    }
