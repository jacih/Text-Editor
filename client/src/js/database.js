import { openDB } from 'idb';

const initdb = async () =>
  openDB('txedDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('txedDB')) {
        console.log('txedDB database already exists');
        return;
      }
      db.createObjectStore('txedDB', { keyPath: 'id', autoIncrement: true });
      console.log('txedDB database created');
    },
  });

// POST Logic
export const putDb = async (content) => {
  console.log('Post one to the database');
  const txedDb = await openDB('txedDB', 1);
  const tx = txedDb.transaction('txedDB', 'readwrite');
  const store = tx.objectStore('txedDB');
  const request = store.add({ txedDB: content });
  const result = await request;
  console.log('🚀 -Data saved to the txedDB database', result);
};

// GET Logic
export const getDb = async () => {
  console.log('GET all from the database');
  const txedDb = await openDB('txedDB', 1);
  const tx = txedDb.transaction('txedDB', 'readwrite');
  const store = tx.objectStore('txedDB');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
};

initdb();
