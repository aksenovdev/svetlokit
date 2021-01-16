import type { Readable } from 'svelte/store';
import type { SvelteAction } from './action.interface';
export type { SvelteAction };
declare type HtmlElementEvents = keyof HTMLElementEventMap;
export interface ActionOptions {
    animationCssClass: string;
    notifier$?: Readable<any>;
    elementEvents?: HtmlElementEvents[];
}
export declare const playAnimationWhen: SvelteAction<ActionOptions>;
export declare const playAnimationWhenClick: SvelteAction<Pick<ActionOptions, 'animationCssClass' | 'notifier$'>>;
