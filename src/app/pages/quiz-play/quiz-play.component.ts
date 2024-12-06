import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Question, Quiz, QuizService } from "../../services/quiz.service";

@Component({
  selector: "app-quiz-play",
  templateUrl: "./quiz-play.component.html",
  styleUrl: "./quiz-play.component.css",
})
export class QuizPlayComponent implements OnInit {
  quiz: Quiz | undefined;
  currentQuestion: Question | undefined;
  showAnswer = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  async ngOnInit() {
    const quizId = Number(this.route.snapshot.paramMap.get("id"));
    if (quizId) {
      await this.loadQuiz(quizId);
      this.selectRandomQuestion();
    }
  }

  async loadQuiz(quizId: number) {
    this.quiz = await this.quizService.getQuizById(quizId);
  }

  selectRandomQuestion() {
    this.currentQuestion = this.quizService.getRandomQuestion(
      this.quiz,
      this.currentQuestion
    );
    this.showAnswer = false;
  }

  async updateResponseLevel(level: "GOOD" | "MODERATE" | "BAD") {
    if (this.quiz && this.currentQuestion) {
      this.currentQuestion.responseLevel = level;
      await this.quizService.updateQuiz(this.quiz);
      this.selectRandomQuestion();
    }
  }

  nextQuestion() {
    this.selectRandomQuestion();
  }

  goBack() {
    this.router.navigate(["/quizzes"]);
  }
}
