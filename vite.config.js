import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Custom plugin to preserve JSDoc comments
const preserveCommentsPlugin = () => ({
	name: 'preserve-comments',
	renderChunk(code) {
		// Match and retain JSDoc comments
		const retainedComments = code.match(/\/\*\*[\s\S]*?\*\//g) || [];
		const preservedCode = retainedComments.join('\n') + '\n' + code;
		return {
			code: preservedCode,
			map: null,
		};
	},
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.md'],
	},
	build: {
		lib: {
			entry: 'src/index.js',
			name: 'nanowebReact', // The global variable name for your library if used via <script> tag
			fileName: (format) => `nanoweb-react.${format}.js`,
		},
		rollupOptions: {
			// Ensure external dependencies like React are not bundled into your library
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
			plugins: [preserveCommentsPlugin()],
		},
		// sourcemap: true, // Enable source maps for debugging
	},
});
