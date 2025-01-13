import { useEffect, useState, useRef } from 'react';
import { fromJSON, toJSON } from './storage';

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
			resolve(event.target.result ? fromJSON(event.target.result.value) : undefined);
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
		const request = objectStore.put({ id: key, value: toJSON(value) });

		request.onsuccess = () => {
			notify(key, value);
			resolve();
		};

		request.onerror = (event) => {
			reject(event.target.error);
		};
	});
};

export const useIDbState = (key, defaultValue, dbOpts = { name: 'db', store: 'store', sanitizer: (v) => v }) => {
	const [value, setValue] = useState(defaultValue);
	const didInit = useRef(false);
	const sanitizer = dbOpts.sanitizer;

	// Extracted dependencies to avoid complex expressions in useEffect
	const dbName = dbOpts.name;
	const storeName = dbOpts.store;
	const serializedValue = JSON.stringify(value);

	useEffect(() => {
		if (!didInit.current) {
			getDbValue(dbName, storeName, key)
				.then((storedValue) => {
					if (storedValue !== undefined) {
						setValue(storedValue);
					}
					didInit.current = true;
				})
				.catch((error) => {
					console.error('Error fetching value from IndexedDB:', error);
				});

			subscribe(key, setValue);
		}
	}, [dbName, storeName, key]);

	useEffect(() => {
		if (didInit.current) {
			setDbValue(dbName, storeName, key, value).catch((error) => {
				console.error('Error setting value in IndexedDB:', error);
			});
		}
	}, [dbName, storeName, key, serializedValue, value]);

	// Apply sanitizer to updated values
	const sanitizedSetState = (value) => {
		if (typeof value === 'function') {
			// If value is a function, apply sanitizer to the result of the function
			setValue((prevState) => sanitizer(value(prevState)))
		} else {
			setValue(sanitizer(value))
		}
	}

	return [value, sanitizedSetState]
};
