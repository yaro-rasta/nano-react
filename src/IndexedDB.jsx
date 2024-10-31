import { useEffect, useState, useRef } from 'react';

const subscriptions = new Map();

const subscribe = (key, callback) => {
	if (!subscriptions.has(key)) {
		subscriptions.set(key, []);
	}
	subscriptions.get(key).push(callback);
};

const notify = (key, value) => {
	if (subscriptions.has(key)) {
		for (const callback of subscriptions.get(key)) {
			callback(value);
		}
	}
};

const getDbInstance = (dbName, storeName) => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, 1);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: 'id' });
			}
		};

		request.onsuccess = (event) => {
			resolve(event.target.result);
		};

		request.onerror = (event) => {
			reject(event.target.error);
		};
	});
};

const getDbValue = async (dbName, storeName, key) => {
	const db = await getDbInstance(dbName, storeName);
	return new Promise((resolve, reject) => {
		const transaction = db.transaction([storeName], 'readonly');
		const objectStore = transaction.objectStore(storeName);
		const request = objectStore.get(key);

		request.onsuccess = (event) => {
			resolve(event.target.result ? event.target.result.value : undefined);
		};

		request.onerror = (event) => {
			reject(event.target.error);
		};
	});
};

const setDbValue = async (dbName, storeName, key, value) => {
	const db = await getDbInstance(dbName, storeName);
	return new Promise((resolve, reject) => {
		const transaction = db.transaction([storeName], 'readwrite');
		const objectStore = transaction.objectStore(storeName);
		const request = objectStore.put({ id: key, value });

		request.onsuccess = () => {
			notify(key, value);
			resolve();
		};

		request.onerror = (event) => {
			reject(event.target.error);
		};
	});
};

/**
 * Custom React hook that persists state in IndexedDB.
 *
 * @param {string} key - A unique key to identify the state in IndexedDB.
 * @param {any} defaultValue - The default value for the state.
 * @param {string} [dbName='userDatabase'] - The name of the IndexedDB database where the state will be stored. If not provided, defaults to 'userDatabase'.
 * @param {string} [storeName='userData'] - The name of the object store within the database where the state will be stored. If not provided, defaults to 'userData'.
 * @return {[any, function]} - An array with two elements:
 *    - The current state value.
 *    - A setter function to update the state. This function has the same API as the setter returned by useState.
 */
const useDBState = (key, defaultValue, dbOpts = { name: 'db', store: 'store' }) => {
	const [value, setValue] = useState(defaultValue);
	const didInit = useRef(false);

	useEffect(() => {
		if (!didInit.current) {
			getDbValue(dbOpts.name, dbOpts.store, key).then((storedValue) => {
				if (storedValue !== undefined) {
					setValue(storedValue);
				}
				didInit.current = true;
			}).catch((error) => {
				console.error('Error fetching value from IndexedDB:', error);
			});

			subscribe(key, setValue);
		}
	}, [dbOpts, key]);

	useEffect(() => {
		if (didInit.current) {
			setDbValue(dbOpts.name, dbOpts.store, key, value).catch((error) => {
				console.error('Error setting value in IndexedDB:', error);
			});
		}
	}, [dbOpts.name, dbOpts.store, key, JSON.stringify(value)]);

	return [value, setValue];
};

export { useDBState };
