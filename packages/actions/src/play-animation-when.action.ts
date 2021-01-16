import type { Readable } from 'svelte/store';
import type { SvelteAction } from './action.interface';
export type { SvelteAction };

type HtmlElementEvents = keyof HTMLElementEventMap;
type UnsubscribeFn = () => void;
export interface ActionOptions {
    animationCssClass: string;

    notifier$?: Readable<any>;
    elementEvents?: HtmlElementEvents[];
}

const noop = () => {};
const appendEventsListeners
    = (el: HTMLElement) => (handler: EventListener | EventListenerObject) => (events: HtmlElementEvents[]) => {
        const removeFns: UnsubscribeFn[] = [];

        events.forEach(
            (event: HtmlElementEvents) => {
                el.addEventListener(event, handler);
                removeFns.push(() => el.removeEventListener(event, handler));
            }
        );

        return () => removeFns.forEach(remove => remove());
    };
export const playAnimationWhen: SvelteAction<ActionOptions>
    = (element: HTMLElement, options: ActionOptions) => {
        const addAnimationClassActionFactory = (cssClass: string) => () => {
            element.classList.add(cssClass);
            element.addEventListener(
                'animationend',
                () => element.classList.remove(cssClass),
                { once: true }
            );
        };
        const addListenersForHandler = appendEventsListeners(element);

        let notifierUnsubscribeFn: UnsubscribeFn = noop;
        let listenersUnsubscribeFn: UnsubscribeFn = noop;
        let addAnimationClass: () => void = noop;
        let addAnimationClassOn: (events: HtmlElementEvents[]) => () => void = () => noop;
        const update = (updatedOptions: Partial<ActionOptions> = {}) => {
            if ('animationCssClass' in updatedOptions) {
                addAnimationClass = addAnimationClassActionFactory(updatedOptions.animationCssClass);
                addAnimationClassOn = addListenersForHandler(addAnimationClass);
            }

            if ('notifier$' in updatedOptions) {
                notifierUnsubscribeFn();
                notifierUnsubscribeFn = updatedOptions.notifier$
                    ?.subscribe(addAnimationClass) || noop;
            }

            if ('elementEvents' in updatedOptions) {
                listenersUnsubscribeFn();
                listenersUnsubscribeFn = updatedOptions.elementEvents?.length > 0
                    ? addAnimationClassOn(updatedOptions.elementEvents)
                    : noop;
            }
        }

        update(options);

        return {
            update,
            destroy: notifierUnsubscribeFn
        }
    };
export const playAnimationWhenClick: SvelteAction<Pick<ActionOptions, 'animationCssClass' | 'notifier$'>>
    = (el: HTMLElement, options = { animationCssClass: '' }) =>
        playAnimationWhen(el, { ...options, elementEvents: ['click'] });
