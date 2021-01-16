export const whenHovered = (element, onHover) => {
    const onElHover = () => onHover(true);
    const onElLeave = () => onHover(false);
    element.addEventListener('mouseenter', onElHover);
    element.addEventListener('mouseleave', onElLeave);
};
