import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "signin",
    loadChildren: () =>
      import("./pages/signin/signin.module").then((m) => m.SigninModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: "quizzes",
    loadChildren: () =>
      import("./pages/quiz-list/quiz-list.module").then(
        (m) => m.QuizListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "quizzes/create",
    loadChildren: () =>
      import("./pages/quiz-form/quiz-form.module").then(
        (m) => m.QuizFormModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "quizzes/edit/:id",
    loadChildren: () =>
      import("./pages/quiz-form/quiz-form.module").then(
        (m) => m.QuizFormModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "quizzes/play/:id",
    loadChildren: () =>
      import("./pages/quiz-play/quiz-play.module").then(
        (m) => m.QuizPlayModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
