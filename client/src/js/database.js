import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
console.error('putDb not implemented');
  const jateDb = await openDB('jate',1);
    const tee = jateDb.transaction("jate", 1);
      const store = tee.objectStore('jate');
          const objects = await store.getAll();
  const writeContent = objects.length > 0 ? { 
    content: content, 
  id: objects[0].id } : {content: content};
    const req = await store.put(writeContent);
      const res = await req;
        console.log('You now have saved Data!', res)
}


export const getDb = async () => {
  console.error('getDb not implemented');
    const jateDb = await openDB('jate', 1);
    // Reads only the data we want
      const tee = jateDb.transaction("jate", "readonly");
      // store data
        const store = tee.objectStore("jate");
        // requests the stored data, "getAll- of it"
    const req = await store.getAll();
    const res = await req;
    if(res.length > 0) {
      console.log('result.value', res);
      console.log(res[0].content);
        return res[0].content;
    } else {return null;}
}
initdb();
