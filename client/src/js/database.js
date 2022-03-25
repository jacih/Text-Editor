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
export const postDb = async (content) => {
  console.log('Post one to the database');
  const bateDb = await openDB('texed-db', 1);
  const tx = bateDb.transaction('txedDB', 'readwrite');
  const store = tx.objectStore('txedDB');
  const request = store.add({ txedDB: content });
  const result = await request;
  console.log('🚀 -Data saved to the txedDB database', result);
};

// GET Logic
export const getAllDb = async () => {
  console.log('GET all from the database');
  const bateDb = await openDB('txed', 1);
  const tx = bateDb.transaction('txed', 'readwrite');
  const store = tx.objectStore('txed');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
