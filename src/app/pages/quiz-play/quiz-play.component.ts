import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { QuizService, Quiz, Question } from "../../services/quiz.service";

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
    if (!this.quiz?.questions.length) {
      return;
    }

    // If there's only one question, keep showing it
    if (this.quiz.questions.length === 1) {
      this.currentQuestion = this.quiz.questions[0];
      this.showAnswer = false;
      return;
    }

    const weights = {
      UNKNOWN: 0.4,
      BAD: 0.3,
      MODERATE: 0.2,
      GOOD: 0.1,
    };

    // Filter out the current question
    const availableQuestions = this.quiz.questions.filter(
      (q) => q !== this.currentQuestion
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
        this.currentQuestion = question;
        this.showAnswer = false;
        break;
      }
    }

    // Fallback in case no question was selected (shouldn't happen, but just in case)
    if (!this.currentQuestion) {
      this.currentQuestion = availableQuestions[0];
      this.showAnswer = false;
    }
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
