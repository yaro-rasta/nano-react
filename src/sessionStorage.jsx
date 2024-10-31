import { useState, useEffect } from 'react';

/**
 * useDBState for sessionStorage
 * @param {string} name - The key for sessionStorage
 * @param {*} defaultValue - The initial value if not found in sessionStorage
 */
export function useDBState(name, defaultValue) {
	if ('string' !== typeof name) {
		console.error(`useDBState(name, defaultValue) => name must be a String`);
		return;
	}
	const [state, setState] = useState(() => {
		const storedValue = sessionStorage.getItem(name);
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
	});

	useEffect(() => {
		sessionStorage.setItem(name, JSON.stringify(state));
	}, [name, state]);

	return [state, setState];
}