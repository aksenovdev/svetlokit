export type SvelteAction<Arg = any, El = HTMLElement>
    = (node: El, arg?: Arg) => {
        update?: (arg?: Arg) => void;
        destroy?: () => void;
    } | void;
