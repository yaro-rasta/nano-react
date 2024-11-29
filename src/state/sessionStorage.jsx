import { useState, useEffect } from 'react';

/**
 * useDBState for sessionStorage
 * @param {string} name - The key for sessionStorage
 * @param {*} defaultValue - The initial value if not found in sessionStorage
 * @param {Function} sanitizer - The map function to return the sanitized value.
 */
export function useDBState(name, defaultValue, sanitizer = v => v) {
	const [state, setState] = useState(() => {
		const storedValue = sessionStorage.getItem(name);
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
	});

	useEffect(() => {
		sessionStorage.setItem(name, JSON.stringify(sanitizer(state)));
	}, [name, state, sanitizer]);

	return [state, setState];
}