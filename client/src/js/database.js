import { openDB } from 'idb';

const initdb = async () =>
  openDB('txed', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('txed')) {
        console.log('txed database already exists');
        return;
      }
      db.createObjectStore('txed', { keyPath: 'id', autoIncrement: true });
      console.log('txed database created');
    },
  });

// POST Logic
export const putDb = async (content) => {
  const bateDb = await openDB('texed', 1);
  const tx = bateDb.transaction('txed', 'readwrite');
  const store = tx.objectStore('txed');
  const request = store.put({ txed: content });
  const result = await request;
  console.log('Data saved to the txedDb', result);
};

// GET Logic
export const getDb = async () => {
  const bateDb = await openDB('txed', 1);
  const tx = bateDb.transaction('txed', 'readwrite');
  const store = tx.objectStore('txed');
  const request = store.getAll();
  const result = await request;
  console.log('Data read from the txedDb', result);
};

initdb();
