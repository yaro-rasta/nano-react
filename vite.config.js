import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: 'src/index.js', // Your library's entry file
			name: 'NanoReact', // The global variable name for your library if used via <script> tag
			fileName: (format) => `nano-react.${format}.js`
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