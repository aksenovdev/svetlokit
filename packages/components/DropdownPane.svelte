<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { fly } from 'svelte/transition';
    import { delayedWhen } from '@svetlokit/stores';
    import { whenHovered, hasAbsolutePosition } from '@svetlokit/actions';

    export let target: HTMLElement = null;
    export let position: 'top' | 'bottom' = 'bottom';
    export let opened: boolean = false;
    export let delayOnClose: boolean = true;
    export let stayOpenWhileHovered: boolean = true;
    export { className as class }; let className: string = '';

    const dispatcher = createEventDispatcher();
    const isOpen$: Writable<boolean> = delayedWhen(
        opened,
        { predicate: (isOpened: boolean) => delayOnClose && !isOpened }
    );
    let hovered: boolean = false;

    $: dispatcher('hover', hovered);
    $: isOpen$.set(opened);
    $: isOpened = $isOpen$ || (stayOpenWhileHovered && hovered);
</script>

<style lang="scss">
    .dropdown-pane {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 10;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 200px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        border-radius: 2px;
        background-color: white;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);

        &.top {
            bottom: calc(100% + 5px);
        }

        &.bottom {
            top: calc(100% + 5px);
        }
    }
</style>

{#if isOpened}
    <div
        use:hasAbsolutePosition="{target}"
        use:whenHovered="{isHovered => (hovered = isHovered)}"
        class="dropdown-pane {position} {className}"
        in:fly="{{ duration: 200, y: position === 'bottom' ? -10 : 10, delay: 10 }}"
    >
        <slot></slot>
    </div>
{/if}
