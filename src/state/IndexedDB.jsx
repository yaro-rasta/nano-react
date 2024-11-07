// IndexedDB.jsx
import { useEffect, useState } from "react";

// Відкриття IndexedDB
const getDbInstance = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
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

// Отримання значення з IndexedDB
const getDbValue = async (dbName, storeName, key) => {
  const db = await getDbInstance(dbName, storeName);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
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

// Збереження значення в IndexedDB
const setDbValue = async (dbName, storeName, key, value) => {
  const db = await getDbInstance(dbName, storeName);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put({ id: key, value });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Користувацький хук для IndexedDB
export const useDBState = (
  key,
  defaultValue,
  dbOpts = { name: "db", store: "store" }
) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Отримуємо значення при першому рендері
    const fetchData = async () => {
      try {
        const storedValue = await getDbValue(dbOpts.name, dbOpts.store, key);
        if (storedValue !== undefined) {
          setValue(storedValue);
        }
      } catch (error) {
        console.error("Error fetching value from IndexedDB:", error);
      }
    };

    fetchData();
  }, [dbOpts.name, dbOpts.store, key]);

  useEffect(() => {
    // Зберігаємо значення при його зміні
    const saveData = async () => {
      try {
        await setDbValue(dbOpts.name, dbOpts.store, key, value);
      } catch (error) {
        console.error("Error saving value to IndexedDB:", error);
      }
    };

    if (value !== defaultValue) {
      saveData();
    }
  }, [value, dbOpts.name, dbOpts.store, key, defaultValue]);

  return [value, setValue];
};
