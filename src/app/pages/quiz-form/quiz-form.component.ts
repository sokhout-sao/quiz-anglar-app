import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../services/auth.service";
import { QuizService, Quiz, Question } from "../../services/quiz.service";
import { QuestionFormDialogComponent } from "./question-form-dialog/question-form-dialog.component";

@Component({
  selector: "app-quiz-form",
  templateUrl: "./quiz-form.component.html",
  styleUrl: "./quiz-form.component.css",
})
export class QuizFormComponent implements OnInit {
  quizForm: FormGroup;
  questions: Question[] = [];
  isEditing = false;
  isLoading = false;
  private quizId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private quizService: QuizService
  ) {
    this.quizForm = this.fb.group({
      title: ["", Validators.required],
    });
  }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.isEditing = true;
      this.quizId = Number(idParam);
      await this.loadQuiz();
    }
  }

  async loadQuiz() {
    if (this.quizId) {
      const quiz = await this.quizService.getQuizById(this.quizId);
      if (quiz) {
        this.quizForm.patchValue({ title: quiz.title });
        this.questions = quiz.questions;
      }
    }
  }

  addQuestion() {
    const dialogRef = this.dialog.open(QuestionFormDialogComponent, {
      width: "600px",
      data: { mode: "create" },
    });

    dialogRef.afterClosed().subscribe((question: Question | undefined) => {
      if (question) {
        this.questions.push(question);
        this.onSubmit();
      }
    });
  }

  editQuestion(question: Question) {
    const dialogRef = this.dialog.open(QuestionFormDialogComponent, {
      width: "600px",
      data: { mode: "edit", question },
    });

    dialogRef
      .afterClosed()
      .subscribe((updatedQuestion: Question | undefined) => {
        if (updatedQuestion) {
          const index = this.questions.indexOf(question);
          this.questions[index] = updatedQuestion;
          this.onSubmit();
        }
      });
  }

  deleteQuestion(question: Question) {
    if (confirm("Are you sure you want to delete this question?")) {
      const index = this.questions.indexOf(question);
      this.questions.splice(index, 1);
    }
  }

  async onSubmit() {
    console.log("Saving...");

    if (this.quizForm.valid) {
      this.isLoading = true;

      try {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        const quiz: Quiz = {
          id: this.quizId,
          username: currentUser.username,
          title: this.quizForm.value.title,
          questions: this.questions,
        };

        if (this.isEditing) {
          await this.quizService.updateQuiz(quiz);
        } else {
          await this.quizService.addQuiz(quiz);
        }

        this.snackBar.open("Quiz saved successfully", "Close", {
          duration: 3000,
        });
      } catch (error) {
        this.snackBar.open("Error saving quiz", "Close", {
          duration: 3000,
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

  goBack() {
    this.router.navigate(["/quizzes"]);
  }
}
