/**
 * Handles keypress events and triggers the provided callback function if the key combination matches any in the specified buttons array.
 * 
 * @param {KeyboardEvent} event - The keypress event object.
 * @param {string[]} buttons - An array of key combinations (e.g., 'Meta+Shift+R', 'Control+Shift+S') to listen for. 
 *                             The combinations should be written in the format: 'Modifier+Modifier+Key', 
 *                             where Modifier can be 'Meta', 'Control', 'Shift', 'Alt', and Key is the actual key pressed.
 * @param {Function} fn - The callback function to trigger when the key combination matches.
 * 
 * @example
 * // Call a function when CMD + SHIFT + R or CTRL + SHIFT + S is pressed
 * document.addEventListener('keydown', (event) => {
 *     handleKeyPress(event, ['Meta+Shift+R', 'Control+Shift+S'], () => {
 *         console.log('CMD+SHIFT+R or CTRL+SHIFT+S pressed');
 *     });
 * });
 */
const handleKeyPress = (event, buttons, fn, opts = { stop: false }) => {
	// Create a string representing the combination of keys pressed
	const pressedKeys = [
		event.metaKey ? 'Meta' : '',    // CMD (or Windows key)
		event.ctrlKey ? 'Control' : '', // Control key
		event.shiftKey ? 'Shift' : '',  // Shift key
		event.altKey ? 'Alt' : '',      // Alt key
		event.key // The actual key pressed
	].filter(Boolean).join('+')  // Join keys with '+' and remove empty values

	// Check if the combination matches any of the buttons
	if (buttons.includes(pressedKeys)) {
		if (opts?.stop) {
			event.preventDefault()
			event.stopPropagation()
		}
		fn(event)
	}
};

export { handleKeyPress }