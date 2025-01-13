/**
 * State hooks definitions for nanoweb-react.
 */

export type Setter<T> = (value: T | ((prevState: T) => T)) => void;

/**
 * Custom React hook that persists state in localStorage.
 * @param key A unique key to identify the state in `localStorage`.
 * @param defaultValue The default value for the state if no value is found in `localStorage`.
 * @returns An array containing the current state value and a setter function.
 */
export declare function useLSState<T>(key: string, defaultValue: T): [T, Setter<T>];

/**
 * Custom React hook that persists state in sessionStorage.
 * @param key A unique key to identify the state in `sessionStorage`.
 * @param defaultValue The default value for the state if no value is found in `sessionStorage`.
 * @returns An array containing the current state value and a setter function.
 */
export declare function useSSState<T>(key: string, defaultValue: T): [T, Setter<T>];

/**
 * Options for configuring the IndexedDB database.
 */
export interface IDbOptions {
	name?: string; // Name of the database
	store?: string; // Name of the object store
}

/**
 * Custom React hook that persists state in IndexedDB.
 * @param key A unique key to identify the state in IndexedDB.
 * @param defaultValue The default value for the state if no value is found in the database.
 * @param dbOpts Configuration options for the IndexedDB database.
 * @returns An array containing the current state value and a setter function.
 */
export declare function useIDbState<T>(
	key: string,
	defaultValue: T,
	dbOpts?: IDbOptions
): [T, Setter<T>];

/**
 * Custom React hook for fetching and managing remote state.
 * @param url The remote URL to fetch the data from.
 * @param defaultValue The default value for the state if the fetch fails or returns no data.
 * @returns An array containing the current state value and a setter function.
 */
export declare function useRemoteState<T>(url: string, defaultValue: T): [T, Setter<T>];
