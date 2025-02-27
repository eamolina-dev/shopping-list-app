import * as SQLite from 'expo-sqlite';

const openDB = async () => {
  try {
    return await SQLite.openDatabaseAsync('shopping.db');
  } catch (error) {
    console.error('Error al abrir la base de datos:', error);
    throw error;
  }
};

export const setupDB = async () => {
  try {
    const db = await openDB();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL,
        acquired BOOLEAN NOT NULL DEFAULT 0,
        list_id INTEGER,
        FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE
      );
    `);

    console.log("Tablas creadas o verificadas correctamente.");
  } catch (error) {
    console.error("Error al configurar la base de datos:", error);
  }
};

export const getLists = async () => {
  try {
    const db = await openDB();
    return await db.getAllAsync('SELECT * FROM lists');
  } catch (error) {
    console.error("Error al obtener listas:", error);
    return [];
  }
};

export const insertList = async (listName) => {
  if (!listName.trim()) return;
  try {
    const db = await openDB();
    await db.runAsync('INSERT INTO lists (name) VALUES (?)', [listName]);
    console.log("Lista insertada con éxito.");

    const result = await db.getFirstAsync('SELECT last_insert_rowid() as id');
    return result?.id || null;
  } catch (error) {
    console.error("Error al insertar lista:", error);
  }
};

export const updateList = async (id, newName) => {
  if (!newName.trim()) return;
  try {
    const db = await openDB();
    await db.runAsync('UPDATE lists SET name = ? WHERE id = ?', [newName, id]);
    console.log("Lista actualizada con éxito.");
  } catch (error) {
    console.error("Error al actualizar lista:", error);
  }
};

export const deleteList = async (id) => {
  try {
    const db = await openDB();
    await db.runAsync('DELETE FROM lists WHERE id = ?', [id]);
    console.log("Lista eliminada con éxito.");
  } catch (error) {
    console.error("Error al eliminar lista:", error);
  }
};

export const deleteAllLists = async () => {
  try {
    const db = await openDB();
    await db.runAsync('DELETE FROM lists');
    console.log("Todas las listas han sido eliminadas.");
  } catch (error) {
    console.error("Error al eliminar todas las listas:", error);
  }
};

export const getItems = async () => {
  try {
    const db = await openDB();
    return await db.getAllAsync('SELECT * FROM items');
  } catch (error) {
    console.error("Error al obtener ítems:", error);
    return [];
  }
};

export const insertItem = async (name, listId) => {
  if (!name.trim()) return;
  try {
    const db = await openDB();
    await db.runAsync('INSERT INTO items (name, list_id) VALUES (?, ?)', [name, listId]);
    console.log("Ítem insertado con éxito.");
  } catch (error) {
    console.error("Error al insertar ítem:", error);
  }
};

export const updateItem = async (id, newName) => {
  if (!newName.trim()) return;
  try {
    const db = await openDB();
    await db.runAsync('UPDATE items SET name = ? WHERE id = ?', [newName, id]);
    console.log("Ítem actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar ítem:", error);
  }
};

export const deleteItem = async (id) => {
  try {
    const db = await openDB();
    await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
    console.log("Ítem eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
  }
};

export const getItemsByList = async (listId) => {
  try {
    const db = await openDB();
    return await db.getAllAsync('SELECT * FROM items WHERE list_id = ?', [listId]);
  } catch (error) {
    console.error("Error al obtener ítems de la lista:", error);
    return [];
  }
};

export const markItemAcquired = async (id, acquired) => {
  try {
    const db = await openDB();
    await db.runAsync('UPDATE items SET acquired = ? WHERE id = ?', [acquired ? 1 : 0, id]);
    console.log("Ítem actualizado como adquirido/no adquirido.");
  } catch (error) {
    console.error("Error al marcar ítem como adquirido:", error);
  }
};
