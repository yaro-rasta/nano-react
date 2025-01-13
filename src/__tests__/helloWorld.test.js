import { describe, it, expect } from '@jest/globals';

function helloWorld() {
	return 'Hello, World!';
}

describe('helloWorld', () => {
	it('should return "Hello, World!"', () => {
		const result = helloWorld();
		expect(result).toBe('Hello, World!');
	});
});
