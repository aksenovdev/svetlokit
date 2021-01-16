const prepareTargetEl = (target) => {
    const computedStyles = getComputedStyle(target);
    const initialStyleAttrValues = {
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
};
export const hasAbsolutePosition = (element, target) => {
    const appendAbsoluteElTo = (targetEl) => {
        const resetTarget = prepareTargetEl(targetEl);
        targetEl.appendChild(element);
        return () => {
            if (element) {
                targetEl.removeChild(element);
            }
            resetTarget();
        };
    };
    let reset = appendAbsoluteElTo(target || element.parentElement);
    return {
        destroy: reset,
        update: (updatedTarget) => {
            reset();
            reset = appendAbsoluteElTo(updatedTarget || element.parentElement);
        }
    };
};
