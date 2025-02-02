import { toJSON, fromJSON } from '../../state/storage'
import { vi } from 'vitest'

class Transformer {
	constructor(props = {}) {
		for (const key in props) this[key] = props[key]
	}
	toObject() {
		return { ...this, transformed: true }
	}
	static from(obj) {
		return new Transformer({ ...obj, restored: true })
	}
}

class JSONTransformer {
	constructor(props = {}) {
		for (const key in props) this[key] = props[key]
	}
	toJSON() {
		return JSON.stringify({  ...this, transformed: true })
	}

	static fromJSON(json) {
		return new JSONTransformer({ ...JSON.parse(json), restored: true })
	}
}

describe('fromJSON', () => {
	test('should convert JSON to an object', () => {
		const json = '{"name":"John Doe"}'
		const obj = fromJSON(json)
		expect(obj).toEqual({ name: 'John Doe' })
	})

	test('should convert JSON to an array', () => {
		const json = '[{"name":"John Doe"},{"name":"Jane Doe"}]'
		const arr = fromJSON(json)
		expect(arr).toEqual([{ name: 'John Doe' }, { name: 'Jane Doe' }])
	})

	test('should convert JSON to an object using a transformer', () => {
		const json = '{"name":"John Doe"}'
		const obj = fromJSON(json, Transformer)
		expect(obj).toBeInstanceOf(Transformer)
		expect(obj).toEqual(new Transformer({ name: 'John Doe', restored: true }))
	})

	test('should convert JSON to an array using a transformer', () => {
		const json = '[{"name":"John Doe"},{"name":"Jane Doe"}]'
		const arr = fromJSON(json, Transformer, [])
		expect(arr).toHaveLength(2)
		expect(arr[0]).toBeInstanceOf(Transformer)
		expect(arr[0]).toEqual(new Transformer({ name: 'John Doe', restored: true }))
		expect(arr[1]).toBeInstanceOf(Transformer)
		expect(arr[1]).toEqual(new Transformer({ name: 'Jane Doe', restored: true }))
	})

	test('should handle invalid JSON gracefully', () => {
		const invalidJson = '{"name": "John Doe"'

		// Mock console.error and console.debug
		const originalConsoleError = console.error
		const originalConsoleDebug = console.debug

		console.error = vi.fn()
		console.debug = vi.fn()

		const value = fromJSON(invalidJson)

		// Restore original methods
		console.error = originalConsoleError
		console.debug = originalConsoleDebug

		expect(value).toBe(false)
	})

	test('should handle null JSON', () => {
		expect(fromJSON(null)).toBeNull()
	})
})

describe('toJSON', () => {
	test('should convert an object to JSON', () => {
		const obj = { name: 'John Doe' }
		const json = toJSON(obj)
		expect(json).toBe('{"name":"John Doe"}')
	})
	test('should convert an array to JSON', () => {
		const arr = [{ name: 'John Doe' }, { name: 'Jane Doe' }]
		const json = toJSON(arr)
		expect(json).toBe('[{"name":"John Doe"},{"name":"Jane Doe"}]')
	})
	test('should convert an array to JSON using a transformer with a toObject method', () => {
		const arr = [new Transformer({ name: 'John Doe' }), new Transformer({ name: 'Jane Doe' })]
		const json = toJSON(arr)
		expect(json).toBe('[{"name":"John Doe","transformed":true},{"name":"Jane Doe","transformed":true}]')
		const restored = fromJSON(json, Transformer)
		expect(restored).toEqual([
			new Transformer({ name: 'John Doe', restored: true, transformed: true }),
			new Transformer({ name: 'Jane Doe', restored: true, transformed: true }),
		])
	})
	test('should convert an object to JSON using a transformer with a toObject method', () => {
		const obj = new Transformer({ name: 'John Doe' })
		const json = toJSON([obj])
		expect(json).toBe('[{"name":"John Doe","transformed":true}]')
		const restored = fromJSON(json, Transformer)
		expect(restored).toEqual([new Transformer({ name: 'John Doe', restored: true, transformed: true })])
	})
	test('should convert an object to JSON using a transformer with a toJSON method', () => {
		const obj = new JSONTransformer({ name: 'John Doe' })
		const json = toJSON(obj)
		expect(json).toBe('{"name":"John Doe","transformed":true}')
		const restored = fromJSON(json, JSONTransformer)
		expect(restored).toEqual(new Transformer({ name: 'John Doe', restored: true, transformed: true }))
	})
})
