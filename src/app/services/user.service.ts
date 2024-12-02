import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore('users', 'readonly');
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  async addUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore('users', 'readwrite');
        const request = store.add(user);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore('users', 'readonly');
        const request = store.get(username);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }
}