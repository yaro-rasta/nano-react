import { useState, useEffect } from 'react'
import { fromJSON, toJSON } from './storage'

/**
 * useLSState for sessionStorage
 * @param {string} name - The key for sessionStorage
 * @param {any} defaultValue - The initial value if not found in sessionStorage
 * @param {Function} sanitizer - The map function to return the sanitized value.
 */
export function useSSState(name, defaultValue, sanitizer = (v) => v) {
	const [jsonState, setJsonState] = useState('')
	const [state, setState] = useState(() => {
		const storedValue = sessionStorage.getItem(name)
		return storedValue !== null ? fromJSON(storedValue, sanitizer) : defaultValue
	})

	// Sync sessionStorage whenever the state changes
	useEffect(() => {
		setJsonState(toJSON(state, sanitizer))
	}, [name, state, sanitizer])

	useEffect(() => {
		sessionStorage.setItem(name, jsonState)
	}, [name, jsonState])

	// Apply sanitizer to updated values
	const sanitizedSetState = (value) => {
		if (typeof value === 'function') {
			// If value is a function, apply sanitizer to the result of the function
			setState((prevState) => sanitizer(value(prevState)))
		} else {
			setState(sanitizer(value))
		}
	}

	return [state, sanitizedSetState]
}
