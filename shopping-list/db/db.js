import * as SQLite from 'expo-sqlite';
import { Products } from '../constants/products'; // Ajusta la ruta según la ubicación real

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

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ListItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        list_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE,
        FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE(list_id, product_id) -- Evita duplicados en la misma lista
      );
    `);

    await insertProductsIfNotExists();

    const products = await db.getAllAsync('SELECT * FROM products');
    console.log(products);

    console.log("Base de datos configurada correctamente.");
  } catch (error) {
    console.error("Error al configurar la base de datos:", error);
  }
};

const insertProductsIfNotExists = async () => {
  try {
    const db = await openDB();

    const insertQuery = 'INSERT OR IGNORE INTO products (name) VALUES (?)';
    for (const product of Products) {
      await db.runAsync(insertQuery, [product.name]);
    }

    console.log("Productos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar productos:", error);
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
    return await db.getAllAsync('SELECT * FROM products');
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

export const insertItemIntoList = async (listId, productId) => {
  try {
    const db = await openDB();
    await db.runAsync(
      'INSERT OR IGNORE INTO ListItems (list_id, product_id) VALUES (?, ?)',
      [listId, productId]
    );
    console.log("Ítem insertado en la lista con éxito.");
  } catch (error) {
    console.error("Error al insertar ítem en la lista:", error);
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
    return await db.getAllAsync(`
      SELECT p.id, p.name 
      FROM ListItems li
      JOIN products p ON li.product_id = p.id
      WHERE li.list_id = ?
    `, [listId]);
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

export const clearDatabase = async () => {
  try {
    const db = await openDB();
    await db.execAsync(`
      DROP TABLE IF EXISTS ListItems;
      DROP TABLE IF EXISTS items;
      DROP TABLE IF EXISTS lists;
      DROP TABLE IF EXISTS products;
    `);
    console.log("Tablas eliminadas correctamente.");
    
    await setupDB(); // Recrea la base de datos
  } catch (error) {
    console.error("Error al limpiar la base de datos:", error);
  }
};
