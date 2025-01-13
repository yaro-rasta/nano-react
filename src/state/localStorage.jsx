import { useState, useEffect } from 'react'
import { fromJSON, toJSON } from './storage'

/**
 * useLSState for localStorage
 * @param {string} name - The key for localStorage
 * @param {any} defaultValue - The initial value if not found in localStorage
 * @param {Function} sanitizer - The map function to return the sanitized value.
 */
export function useLSState(name, defaultValue, sanitizer = (v) => v) {
	const [jsonState, setJsonState] = useState('')
	const [state, setState] = useState(() => {
		const storedValue = localStorage.getItem(name)
		return storedValue !== null ? fromJSON(storedValue, sanitizer) : defaultValue
	})

	// Reset state when the `name` changes
	useEffect(() => {
		const storedValue = localStorage.getItem(name)
		const newValue = storedValue !== null ? fromJSON(storedValue, sanitizer) : defaultValue
		setState(newValue)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	// Sync localStorage whenever the state changes
	useEffect(() => {
		setJsonState(toJSON(state, sanitizer))
	}, [state, sanitizer])

	useEffect(() => {
		if (jsonState !== '') {
			localStorage.setItem(name, jsonState)
		}
	}, [name, jsonState])

	// Apply sanitizer to updated values
	const sanitizedSetState = (value) => {
		if (typeof value === 'function') {
			setState((prevState) => sanitizer(value(prevState)))
		} else {
			setState(sanitizer(value))
		}
	}

	return [state, sanitizedSetState]
}
