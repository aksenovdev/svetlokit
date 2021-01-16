const noop = () => { };
const appendEventsListeners = (el) => (handler) => (events) => {
    const removeFns = [];
    events.forEach((event) => {
        el.addEventListener(event, handler);
        removeFns.push(() => el.removeEventListener(event, handler));
    });
    return () => removeFns.forEach(remove => remove());
};
export const playAnimationWhen = (element, options) => {
    const addAnimationClassActionFactory = (cssClass) => () => {
        element.classList.add(cssClass);
        element.addEventListener('animationend', () => element.classList.remove(cssClass), { once: true });
    };
    const addListenersForHandler = appendEventsListeners(element);
    let notifierUnsubscribeFn = noop;
    let listenersUnsubscribeFn = noop;
    let addAnimationClass = noop;
    let addAnimationClassOn = () => noop;
    const update = (updatedOptions = {}) => {
        var _a, _b;
        if ('animationCssClass' in updatedOptions) {
            addAnimationClass = addAnimationClassActionFactory(updatedOptions.animationCssClass);
            addAnimationClassOn = addListenersForHandler(addAnimationClass);
        }
        if ('notifier$' in updatedOptions) {
            notifierUnsubscribeFn();
            notifierUnsubscribeFn = ((_a = updatedOptions.notifier$) === null || _a === void 0 ? void 0 : _a.subscribe(addAnimationClass)) || noop;
        }
        if ('elementEvents' in updatedOptions) {
            listenersUnsubscribeFn();
            listenersUnsubscribeFn = ((_b = updatedOptions.elementEvents) === null || _b === void 0 ? void 0 : _b.length) > 0
                ? addAnimationClassOn(updatedOptions.elementEvents)
                : noop;
        }
    };
    update(options);
    return {
        update,
        destroy: notifierUnsubscribeFn
    };
};
export const playAnimationWhenClick = (el, options = { animationCssClass: '' }) => playAnimationWhen(el, Object.assign(Object.assign({}, options), { elementEvents: ['click'] }));
