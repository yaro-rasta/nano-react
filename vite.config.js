import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import markdown from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		markdown({
			markdownItOptions: {
				html: true,
				linkify: true,
				typographer: true,
			},
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.md'],
	},
	build: {
		lib: {
			entry: 'src/index.js',
			name: 'nanowebReact', // The global variable name for your library if used via <script> tag
			fileName: (format) => `nanoweb-react.${format}.js`
		},
		rollupOptions: {
			// Ensure external dependencies like React are not bundled into your library
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
});