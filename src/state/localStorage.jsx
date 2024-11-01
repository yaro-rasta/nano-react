import { useState, useEffect } from 'react';

/**
 * useDBState for localStorage
 * @param {string} name - The key for localStorage
 * @param {*} defaultValue - The initial value if not found in localStorage
 */
export function useDBState(name, defaultValue) {
	const [state, setState] = useState(() => {
		const storedValue = localStorage.getItem(name);
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
	});

	useEffect(() => {
		localStorage.setItem(name, JSON.stringify(state));
	}, [name, state]);

	return [state, setState];
}