import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'QuizPWADB';
  private readonly DB_VERSION = 1;

  constructor() {
    this.initDatabase();
  }

  initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("initDatabase");
      
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('Error opening database');
        reject();
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('users')) {
          const usersStore = db.createObjectStore('users', { keyPath: 'username' });
          usersStore.createIndex('username', 'username', { unique: true });
        }

        if (!db.objectStoreNames.contains('quizzes')) {
          const quizzesStore = db.createObjectStore('quizzes', { keyPath: 'id', autoIncrement: true });
          quizzesStore.createIndex('username', 'username', { unique: false });
          quizzesStore.createIndex('title', 'title', { unique: true });
        }
      };
    });
  }

  getStore(storeName: string, mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }
}