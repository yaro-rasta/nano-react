import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom', // Force jsdom globally for React tests
		setupFiles: './vitest.setup.js', // Ensure browser-like environment setup
	},
	server: {
		deps: {
			inline: ['@testing-library/react'], // Fixes compatibility with React Testing Library
		},
	},
	deps: {
		optimizer: {
			web: {
				include: ['@testing-library/react'], // Alternative approach to ensure testing-library works
			},
		},
	},
})
