import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import vitest from 'eslint-plugin-vitest';

export default [
	{
		ignores: [
			'**/.vite_cache/**',
			'**/dist/**',
			'**/dist-app/**',
			'**/node_modules/**',
		],
	},
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest', // Use the latest ECMAScript version
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
			globals: {
				React: 'readonly', // Prevent React-related ESLint errors
				...react.configs.globals,
				...reactHooks.configs.globals,
				...vitest.environments.globals, // Add Vitest globals
			},
		},
		settings: {
			react: { version: 'detect' }, // Automatically detect React version
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			vitest,
		},
		rules: {
			'react/jsx-runtime': 'off',
			'react/jsx-uses-react': 'off', // Not needed in React 17+
			'react/react-in-jsx-scope': 'off', // Not needed in React 17+
			'react/jsx-no-target-blank': 'off', // Allow links to open in a new tab without `noopener noreferrer`
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			...react.configs.recommended.rules, // React recommended rules
			...reactHooks.configs.recommended.rules, // React Hooks recommended rules
			'vitest/no-focused-tests': 'error', // Prevent focused tests in Vitest
			'vitest/no-disabled-tests': 'warn', // Warn for disabled tests in Vitest
			'vitest/no-identical-title': 'error', // Disallow duplicate test titles
		},
	},
];
