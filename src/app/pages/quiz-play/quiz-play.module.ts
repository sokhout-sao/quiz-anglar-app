import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RouterModule } from "@angular/router";
import { QuizPlayComponent } from "./quiz-play.component";

@NgModule({
  declarations: [QuizPlayComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    RouterModule.forChild([{ path: "", component: QuizPlayComponent }]),
  ],
})
export class QuizPlayModule {}
