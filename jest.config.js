export default {
	projects: [
		{
			displayName: 'agnostic',
			testEnvironment: 'node', // Use Node.js environment
			testMatch: [
				'<rootDir>/src/**/*.test.js'
			], // Node tests
			transform: {}, // Явно вимикає трансформацію
			// transform: {
			// 	'^.+\\.jsx?$': 'babel-jest',
			// 	// '^.+\\.mjs?$': 'babel-jest', // Transform for JS/JSX files
			// },
			moduleFileExtensions: ["js", "mjs", "json"],
			// extensionsToTreatAsEsm: ['.jsx'], // Трактувати ці розширення як ESM
		},
		{
			displayName: 'browser',
			testEnvironment: 'jest-environment-jsdom', // Use JSDOM for browser-like tests
			testMatch: [
				'<rootDir>/test/browser/**/*.test.js',
				'<rootDir>/test/browser/**/*.test.mjs',
			], // Browser tests
			// setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'], // Optional setup file for browser tests
			transform: {
				'^.+\\.jsx?$': 'babel-jest', // Transform for JS/JSX files
			},
			extensionsToTreatAsEsm: ['.jsx'],
			moduleFileExtensions: ['js', 'jsx', 'json', 'mjs'],
		},
		{
			displayName: 'node',
			testEnvironment: 'node', // Use Node.js environment
			testMatch: [
				'<rootDir>/test/build.test.js'
			], // Node tests
			transform: {}, // Явно вимикає трансформацію
			moduleFileExtensions: ["js", "mjs", "json"],
		},
	]
};
