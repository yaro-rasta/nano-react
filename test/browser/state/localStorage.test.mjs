import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { useLSState } from '../../../src/state/localStorage';

describe('useLSState', () => {
	beforeEach(() => {
		localStorage.clear(); // Clear localStorage before each test
	});

	it('initializes with default value if no localStorage entry exists', () => {
		const { result } = renderHook(() => useLSState('testKey', 'defaultValue'));

		expect(result.current[0]).toBe('defaultValue');
		expect(localStorage.getItem('testKey')).toBe(JSON.stringify('defaultValue'));
	});

	it('initializes with value from localStorage if entry exists', () => {
		localStorage.setItem('testKey', JSON.stringify('storedValue'));

		const { result } = renderHook(() => useLSState('testKey', 'defaultValue'));

		expect(result.current[0]).toBe('storedValue');
	});

	it('updates localStorage when state changes', () => {
		const { result } = renderHook(() => useLSState('testKey', 'defaultValue'));

		act(() => {
			result.current[1]('newValue');
		});

		expect(result.current[0]).toBe('newValue');
		expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
	});

	it('uses sanitizer function on initialization', () => {
		const sanitizer = jest.fn(value => value.toUpperCase());
		localStorage.setItem('testKey', JSON.stringify('storedValue'));

		const { result } = renderHook(() => useLSState('testKey', 'defaultValue', sanitizer));

		expect(result.current[0]).toBe('STOREDVALUE');
		expect(sanitizer).toHaveBeenCalledWith('storedValue');
	});

	it('uses sanitizer function on updates', () => {
		// @todo fix here the sanitizer function
		const sanitizer = jest.fn(value => value.toUpperCase());
		const { result } = renderHook(() => useLSState('testKey', 'defaultValue', sanitizer));

		act(() => {
			result.current[1]('newValue');
		});

		expect(result.current[0]).toBe('NEWVALUE');
		expect(localStorage.getItem('testKey')).toBe(JSON.stringify('NEWVALUE'));
	});

	it('changes localStorage key when name changes', () => {
		const { result, rerender } = renderHook(
			({ name }) => useLSState(name, 'defaultValue'),
			{ initialProps: { name: 'key1' } }
		);
		act(() => {
			result.current[1]('value1');
		});
		expect(localStorage.getItem('key1')).toBe(JSON.stringify('value1'));
		rerender({ name: 'key2' });
		expect(result.current[0]).toBe('defaultValue');
		expect(localStorage.getItem('key2')).toBe(JSON.stringify('defaultValue'));
		expect(localStorage.getItem('key1')).toBe(JSON.stringify('value1'));
	});
});
