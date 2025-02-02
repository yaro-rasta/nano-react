function helloWorld() {
	return 'Hello, World!'
}

describe('helloWorld', () => {
	test('should return "Hello, World!"', () => {
		const result = helloWorld()
		expect(result).toBe('Hello, World!')
	})
})
