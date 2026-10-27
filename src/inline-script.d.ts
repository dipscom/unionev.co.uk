declare module '*?inline-script' {
	/** Minified source of the script, for inlining in a <script> tag (see vite.config.ts) */
	const code: string;
	export default code;
}
