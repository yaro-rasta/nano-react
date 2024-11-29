import { useState, useEffect } from 'react';

/**
 * useDBState for localStorage
 * @param {string} name - The key for localStorage
 * @param {*} defaultValue - The initial value if not found in localStorage
 * @param {Function} sanitizer - The map function to return the sanitized value.
 */
export function useDBState(name, defaultValue, sanitizer = v => v) {
	const [state, setState] = useState(() => {
		const storedValue = localStorage.getItem(name);
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
	});

	useEffect(() => {
		localStorage.setItem(name, JSON.stringify(sanitizer(state)));
	}, [name, state, sanitizer]);

	return [state, setState];
}