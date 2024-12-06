import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Quiz, QuizService } from "../../services/quiz.service";

@Component({
  selector: "app-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrl: "./quiz-list.component.css",
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.loadQuizzes();
  }

  async loadQuizzes() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.quizzes = await this.quizService.getQuizzes(currentUser.username);
    }
  }

  createQuiz($event: Event) {
    this.router.navigate(["/quizzes/create"]);
  }

  editQuiz($event: Event, quiz: Quiz) {
    this.router.navigate(["/quizzes/edit", quiz.id]);
  }

  playQuiz($event: Event, quiz: Quiz) {
    this.router.navigate(["/quizzes/play", quiz.id]);
  }

  async deleteQuiz($event: Event, quiz: Quiz) {
    if (quiz.id && confirm("Are you sure you want to delete this quiz?")) {
      await this.quizService.deleteQuiz(quiz.id);
      await this.loadQuizzes();
      this.snackBar.open("Quiz deleted successfully", "Close", {
        duration: 3000,
      });
    }
  }

  importQuizzes() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput?.click();
  }

  async exportQuizzes() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const quizzes = await this.quizService.getQuizzes(currentUser.username);
      const dataStr = JSON.stringify(quizzes, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = "quizzes.json";
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        try {
          const importedQuizzes = JSON.parse(e.target.result);
          const currentUser = this.authService.getCurrentUser();

          if (Array.isArray(importedQuizzes) && currentUser) {
            const existingTitles = new Set(this.quizzes.map((q) => q.title));

            for (const quiz of importedQuizzes) {
              let newTitle = quiz.title;
              let counter = 1;

              while (existingTitles.has(newTitle)) {
                newTitle = `${quiz.title} (${counter})`;
                counter++;
              }

              existingTitles.add(newTitle);
              quiz.title = newTitle;
              quiz.username = currentUser.username;
              await this.quizService.addQuiz(quiz);
            }

            await this.loadQuizzes();
            this.snackBar.open("Quizzes imported successfully", "Close", {
              duration: 3000,
            });
          }
        } catch (error) {
          this.snackBar.open("Error importing quizzes", "Close", {
            duration: 3000,
          });
        }
      };
      reader.readAsText(file);
    }
  }
}
