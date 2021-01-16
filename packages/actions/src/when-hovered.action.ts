import type { SvelteAction } from './action.interface';
export type { SvelteAction };

export const whenHovered: SvelteAction<(hovered: boolean) => void>
    = (element: HTMLElement, onHover: (hovered: boolean) => void) => {
        const onElHover = () => onHover(true);
        const onElLeave = () => onHover(false);

        element.addEventListener('mouseenter', onElHover);
        element.addEventListener('mouseleave', onElLeave);
    };
