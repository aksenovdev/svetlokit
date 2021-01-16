<script context="module" lang="ts">
    const getTrueNum = (...args: number[]) => args
        .find(num => !!num);
</script>

<script lang="ts">
    export { elClass as class }; let elClass: string = '';
    export let gap: number = 0;
    export let horizontal: number = gap;
    export let vertical: number = gap;
    export let top: number = vertical;
    export let bottom: number = vertical;
    export let right: number = horizontal;
    export let left: number = horizontal;

    $: elTop = getTrueNum(top, vertical, gap) || 0;
    $: elBottom = getTrueNum(bottom, vertical, gap) || 0;
    $: elRight = getTrueNum(right, horizontal, gap) || 0;
    $: elLeft = getTrueNum(left, horizontal, gap) || 0;
    $: elStyle = `
        margin-top: ${elTop}px;
        margin-left: ${elBottom}px;
        margin-right: ${elRight}px;
        margin-bottom: ${elLeft}px;
    `;
</script>

<style lang="scss">
    .wrap {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
</style>

<div
    class="wrap {elClass}"
    style="{elStyle}"
><slot></slot></div>
