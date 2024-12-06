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

  getRandomQuestion(
    quiz?: Quiz,
    currentQuestion?: Question
  ): Question | undefined {
    if (!quiz || !quiz.questions.length) {
      return undefined;
    }

    // If there's only one question, keep showing it
    if (quiz.questions.length === 1) {
      return quiz.questions[0];
    }

    const weights = {
      UNKNOWN: 0.4,
      BAD: 0.3,
      MODERATE: 0.2,
      GOOD: 0.1,
    };

    // Filter out the current question
    const availableQuestions = quiz.questions.filter(
      (q) => q !== currentQuestion
    );

    // Calculate total weight excluding current question
    const totalWeight = availableQuestions.reduce(
      (sum, q) => sum + weights[q.responseLevel],
      0
    );
    let random = Math.random() * totalWeight;

    // Select a new question using weighted random selection
    for (const question of availableQuestions) {
      random -= weights[question.responseLevel];
      if (random <= 0) {
        return question;
      }
    }

    // Fallback in case no question was selected (shouldn't happen, but just in case)
    return availableQuestions[0];
  }
}
