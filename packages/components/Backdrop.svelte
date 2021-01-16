<script lang="ts">
    import { hasAbsolutePosition } from '@svetlokit/actions';

    export { className as class }; let className: string = '';
    export let backdropBgColor: string = '';

    $: style = backdropBgColor
        ? `--backdrop-bg-color: ${backdropBgColor}`
        : undefined;
</script>

<style lang="scss">
    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--backdrop-bg-color, rgba(0,0,0,.32));
    }
</style>

<div
    {style}
    on:click|self
    use:hasAbsolutePosition
    class="backdrop flex-center {className}"
>
    <slot></slot>
</div>
