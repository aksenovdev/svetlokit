<script lang="ts">
    let styles = '';

    export { styles as style };
    export let size = 'sm';
    export let theme = 'blue';

    $: themeClass = `spinner-loader--${theme}`;
    $: sizeClass = `spinner-loader--size--${size}`;
</script>

<style lang="scss">
    .spinner-loader {
        --size: 50px;
        --thumb-width: 5px;
        --thumb-color: black;

        display: inline-block;
        position: relative;
        width: var(--size);
        height: var(--size);

        &--blue { --thumb-color: #2c66e7; }

        &--size--xs { --size: 20px; --thumb-width: 2px; }
        &--size--sm { --size: 30px; --thumb-width: 3px; }
        &--size--md { --size: 40px; --thumb-width: 4px; }
        &--size--lg { --size: 50px; --thumb-width: 5px; }

        div {
            --inner-size: calc(var(--size) - var(--thumb-width) * 2);

            box-sizing: border-box;
            display: block;
            position: absolute;
            width: var(--inner-size);
            height: var(--inner-size);
            margin: var(--thumb-width);
            border: var(--thumb-width) solid var(--thumb-color);
            border-radius: 50%;
            animation: spin-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: var(--thumb-color) transparent transparent transparent;

            &:nth-child(1) { animation-delay: -0.45s; }
            &:nth-child(2) { animation-delay: -0.3s; }
            &:nth-child(3) { animation-delay: -0.15s; }
        }
    }

    @keyframes spin-loader {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>

<div class="spinner-loader {themeClass} {sizeClass}" style="{styles}">
    <div></div>
    <div></div>
    <div></div>
</div>
