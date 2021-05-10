import type { SvelteAction } from './action.interface';
export type { SvelteAction };

interface InitialStyleAttrValues{
    position: string;
    overflowY: string;
}

const prepareTargetEl: (target: HTMLElement) => () => void
    = (target: HTMLElement) => {
        const computedStyles: CSSStyleDeclaration = getComputedStyle(target);
        const initialStyleAttrValues: InitialStyleAttrValues = {
            position: target.style.position,
            overflowY: target.style.overflowY
        };
        target.style.position = computedStyles.position === 'static'
            ? 'relative'
            : initialStyleAttrValues.position;
        target.style.overflowY = computedStyles.overflowY !== 'visible'
            ? 'visible'
            : initialStyleAttrValues.overflowY;

        return () => {
            target.style.position = initialStyleAttrValues.position;
            target.style.overflowY = initialStyleAttrValues.overflowY;
        };
    }
export const hasAbsolutePosition: SvelteAction<HTMLElement>
    = (element: HTMLElement, target?: HTMLElement) => {
        const appendAbsoluteElTo: (targetEl: HTMLElement) => () => void
            = (targetEl: HTMLElement) => {
                const resetTarget = prepareTargetEl(targetEl);
                targetEl.appendChild(element);

                return () => {
                    if (element && targetEl.contains(element)) {
                        targetEl.removeChild(element);
                    }
                    resetTarget();
                }
            };
        let reset = appendAbsoluteElTo(target || element.parentElement);

        return {
            destroy: reset,
            update: (updatedTarget?: HTMLElement) => {
                reset();
                reset = appendAbsoluteElTo(updatedTarget || element.parentElement);
            }
        }
    };
