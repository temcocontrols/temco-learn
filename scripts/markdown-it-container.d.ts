// `markdown-it-container` ships no types of its own; this is the shape the catalog uses.

declare module 'markdown-it-container' {
	interface ContainerOptions {
		/** Text after the kind on the opening line, e.g. `::: note Heads up`. */
		validate?: (params: string) => boolean;
		render?: (tokens: { nesting: number; info: string }[], index: number) => string;
	}

	type ContainerPlugin = (md: unknown, kind: string, options?: ContainerOptions) => void;

	const container: ContainerPlugin;
	export default container;
}
