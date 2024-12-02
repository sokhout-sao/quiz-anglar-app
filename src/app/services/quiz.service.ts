import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";

export interface Question {
  sentence: string;
  response: string;
  responseLevel: "UNKNOWN" | "BAD" | "MODERATE" | "GOOD";
}

export interface Quiz {
  id?: number;
  username: string;
  title: string;
  questions: Question[];
}

@Injectable({
  providedIn: "root",
})
export class QuizService {
  constructor(private db: DatabaseService) {}

  async getQuizzes(username: string): Promise<Quiz[]> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore("quizzes", "readonly");
        const index = store.index("username");
        const request = index.getAll(username);

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

  async addQuiz(quiz: Quiz): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {

        const store = this.db.getStore("quizzes", "readwrite");
        const request = store.add(JSON.parse(JSON.stringify(quiz)));

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

  async updateQuiz(quiz: Quiz): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore("quizzes", "readwrite");
        const request = store.put(quiz);

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

  async deleteQuiz(quizId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore("quizzes", "readwrite");
        const request = store.delete(quizId);

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

  async getQuizById(quizId: number): Promise<Quiz | undefined> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getStore("quizzes", "readonly");
        const request = store.get(quizId);

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
