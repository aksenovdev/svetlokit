import { writable } from 'svelte/store';
const DEFAULT_PREDICATE = (value) => !!value;
export const delayedWhen = (value, { predicate = DEFAULT_PREDICATE, delayTime = 300 } = {}) => {
    const { subscribe, set, update } = writable(value);
    let timeoutId;
    const delayedSet = (value) => {
        clearTimeout(timeoutId);
        if (predicate(value)) {
            timeoutId = setTimeout(() => set(value), delayTime);
        }
        else {
            set(value);
        }
    };
    const delayedUpdate = update.bind({ set: delayedSet });
    return {
        subscribe,
        set: delayedSet,
        update: delayedUpdate
    };
};
export const delayedWhenNot = (value, options) => {
    const originalPredicate = (options === null || options === void 0 ? void 0 : options.predicate) || DEFAULT_PREDICATE;
    const invertedPredicate = (value) => !originalPredicate(value);
    return delayedWhen(value, Object.assign(Object.assign({}, (options || {})), { predicate: invertedPredicate }));
};
