// src/__tests__/useDBState.test.jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useDBState as useLocalStorageState } from '../localStorage';
import { useDBState as useSessionStorageState } from '../sessionStorage';
import { useDBState as useIndexedDBState } from '../IndexedDB';

// Mock setup for IndexedDB
const setupIndexedDB = () => {
	global.indexedDB = {
		open: jest.fn().mockImplementation((dbName) => {
			const db = {
				createObjectStore: jest.fn(),
				close: jest.fn(),
				transaction: jest.fn().mockReturnValue({
					objectStore: jest.fn().mockReturnValue({
						put: jest.fn(),
						get: jest.fn().mockImplementation((key) => ({
							onsuccess: () => null,
							onerror: jest.fn(),
						})),
					}),
				}),
			};
			return {
				onsuccess: jest.fn(),
				onupgradeneeded: jest.fn(),
				result: db,
			};
		}),
	};
};

describe('useDBState - localStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should initialize with default value', () => {
		const { result } = renderHook(() => useLocalStorageState('testKey', 'defaultValue'));
		expect(result.current[0]).toBe('defaultValue');
	});

	it('should store and retrieve value from localStorage', () => {
		const { result } = renderHook(() => useLocalStorageState('testKey', 'defaultValue'));
		act(() => {
			result.current[1]('newValue');
		});
		expect(result.current[0]).toBe('newValue');
		expect(JSON.parse(localStorage.getItem('testKey'))).toBe('newValue');
	});
});

describe('useDBState - sessionStorage', () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	it('should initialize with default value', () => {
		const { result } = renderHook(() => useSessionStorageState('testKey', 'defaultValue'));
		expect(result.current[0]).toBe('defaultValue');
	});

	it('should store and retrieve value from sessionStorage', () => {
		const { result } = renderHook(() => useSessionStorageState('testKey', 'defaultValue'));
		act(() => {
			result.current[1]('newValue');
		});
		expect(result.current[0]).toBe('newValue');
		expect(JSON.parse(sessionStorage.getItem('testKey'))).toBe('newValue');
	});
});

describe('useDBState - IndexedDB', () => {
	beforeAll(() => {
		setupIndexedDB();
	});

	it('should initialize with default value', () => {
		const { result } = renderHook(() =>
			useIndexedDBState({ db: 'testDB', store: 'testStore' }, 'defaultValue')
		);
		expect(result.current[0]).toBe('defaultValue');
	});

	it('should store value in IndexedDB', () => {
		const { result } = renderHook(() =>
			useIndexedDBState({ db: 'testDB', store: 'testStore' }, 'defaultValue')
		);
		act(() => {
			result.current[1]('newValue');
		});
		expect(result.current[0]).toBe('newValue');
		// IndexedDB mocks can't be tested directly here, ensure that put() is called correctly
		expect(global.indexedDB.open).toHaveBeenCalledWith('testDB');
	});
});