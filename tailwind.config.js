/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			sans: ['YourCustomFontName', 'Helvetica', 'Arial', 'sans-serif'],
			serif: ['YourCustomSerifFontName', 'Georgia', 'serif'],
			mono: ['YourCustomMonoFontName', 'Menlo', 'monospace'],
		},
	},
	plugins: [],
}

