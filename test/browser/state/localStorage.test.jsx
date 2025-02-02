import React from 'react'
import PropTypes from 'prop-types'
import { render, screen } from '@testing-library/react'
import { act } from '@testing-library/react'
import { vi } from 'vitest'
import { useLSState } from '../../../src/state/localStorage'

const TestComponent = ({ name, defaultValue, sanitizer }) => {
	const [state, setState] = useLSState(name, defaultValue, sanitizer)
	return (
		<div>
			<div data-testid="state">{state}</div>
			<button onClick={() => setState('newValue')}>Update State</button>
		</div>
	)
}

TestComponent.propTypes = {
	name: PropTypes.string.isRequired, // Validate 'name' as a required string
	defaultValue: PropTypes.any,       // 'defaultValue' can be any type
	sanitizer: PropTypes.func,         // 'sanitizer' should be a function
};

describe('useLSState', () => {
	beforeEach(() => {
		localStorage.clear() // Clear localStorage before each test
	})

	test('initializes with default value if no localStorage entry exists', () => {
		render(
			<TestComponent name="testKey" defaultValue="defaultValue" />
		)

		expect(screen.getByTestId('state').textContent).toBe('defaultValue')
		expect(localStorage.getItem('testKey')).toBe(JSON.stringify('defaultValue'))
	})

	test('initializes with value from localStorage if entry exists', () => {
		localStorage.setItem('testKey', JSON.stringify('storedValue'))

		render(
			<TestComponent name="testKey" defaultValue="defaultValue" />
		)

		expect(screen.getByTestId('state').textContent).toBe('storedValue')
	})

	test('updates localStorage when state changes', () => {
		render(
			<TestComponent name="testKey" defaultValue="defaultValue" />
		)

		const button = screen.getByRole('button', { name: /update state/i })
		act(() => {
			button.click()
		})

		expect(screen.getByTestId('state').textContent).toBe('newValue')
		expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'))
	})

	test('uses sanitizer function on initialization', () => {
		const sanitizer = vi.fn(value => value.toUpperCase())
		localStorage.setItem('testKey', JSON.stringify('storedValue'))

		render(
			<TestComponent name="testKey" defaultValue="defaultValue" sanitizer={sanitizer} />
		)
		expect(screen.getByTestId('state').textContent).toBe('STOREDVALUE')
		expect(sanitizer).toHaveBeenCalledWith('storedValue')
	})

	test('uses sanitizer function on updates', () => {
		const sanitizer = vi.fn(value => value.toUpperCase())

		render(
			<TestComponent name="testKey" defaultValue="defaultValue" sanitizer={sanitizer} />
		)

		const button = screen.getByRole('button', { name: /update state/i })
		act(() => {
			button.click()
		})

		expect(screen.getByTestId('state').textContent).toBe('NEWVALUE')
		expect(localStorage.getItem('testKey')).toBe(JSON.stringify('NEWVALUE'))
	})

	test('changes localStorage key when name changes', () => {
		const { rerender } = render(
			<TestComponent name="key1" defaultValue="defaultValue" />
		)
		const button = screen.getByRole('button', { name: /update state/i })
		act(() => {
			button.click()
		})

		expect(screen.getByTestId('state').textContent).toBe('newValue')
		expect(localStorage.getItem('key1')).toBe(JSON.stringify('newValue'))

		rerender(
			<TestComponent name="key2" defaultValue="defaultValue" />
		)

		expect(screen.getByTestId('state').textContent).toBe('defaultValue')
		expect(localStorage.getItem('key2')).toBe(JSON.stringify('defaultValue'))
		expect(localStorage.getItem('key1')).toBe(JSON.stringify('newValue'))
	})
})
