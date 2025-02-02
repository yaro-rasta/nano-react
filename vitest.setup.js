import '@testing-library/jest-dom'

// Ensure jsdom environment
if (typeof window === 'undefined') {
	global.window = {}
	global.document = {
		createElement: () => ({
			getContext: () => ({}),
			appendChild: () => { }, // Prevents the "appendChild" error
		}),
		body: {
			appendChild: () => { }, // Prevents the "appendChild" error
		},
	}
}

// Ensure localStorage is available for tests
if (typeof localStorage === 'undefined') {
	global.localStorage = {
		data: {},
		getItem: (key) => global.localStorage.data[key] || null,
		setItem: (key, value) => (global.localStorage.data[key] = String(value)),
		removeItem: (key) => delete global.localStorage.data[key],
		clear: () => (global.localStorage.data = {}),
	}
}

// Mock sessionStorage as well (optional)
if (typeof sessionStorage === 'undefined') {
	global.sessionStorage = {
		data: {},
		getItem: (key) => global.sessionStorage.data[key] || null,
		setItem: (key, value) => (global.sessionStorage.data[key] = String(value)),
		removeItem: (key) => delete global.sessionStorage.data[key],
		clear: () => (global.sessionStorage.data = {}),
	}
}
