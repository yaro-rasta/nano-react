import { useLSState } from "nanoweb-react"
import * as NanowebReact from 'nanoweb-react'

describe("Should import exported functions", () => {
	test("useLSState from nanoweb-react", () => {
		expect(typeof useLSState).toBe("function")
	})

	test('NanowebReact.useLSState is exported', () => {
		expect(typeof NanowebReact.useLSState).toBe('function');
	});
})
