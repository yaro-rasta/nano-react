import { useLSState } from "nanoweb-react"
import * as NanowebReact from 'nanoweb-react'
import { describe, test, expect } from "@jest/globals"

describe("Should import exported functions", () => {
	test("useLSState from nanoweb-react", () => {
		expect(typeof useLSState).toBe("function")
	})

	test('NanowebReact.useLSState is exported', () => {
		expect(typeof NanowebReact.useLSState).toBe('function');
	});
})
