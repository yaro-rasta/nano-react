import { useState, useEffect } from "react"

/**
 * Custom hook to fetch and manage remote state.
 * @param {string} url - The remote URL to fetch the data from.
 * @param {Object} initialState - The initial state.
 * @returns {Array} - The state and setter function.
 */
export function useRemoteState (url, initialState, opts = { useBaseHref: true }) {
	const [state, setState] = useState(initialState)

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchUrl = url;

				if (opts.useBaseHref) {
					// Prepend base href if available and not already included
					const baseHref = document.querySelector('base')?.getAttribute('href');
					if (baseHref && !url.startsWith(baseHref)) {
						fetchUrl = `${baseHref}${url}`.replace(/\/{2,}/g, '/'); // Avoid double slashes
					}
				}

				const response = await fetch(fetchUrl);
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`)
				}
				const data = await response.json()
				setState(data)
			} catch (err) {
				console.error("Failed to fetch remote state:", err)
			}
		}

		fetchData()
	}, [url, opts.useBaseHref])

	return [state, setState]
}
