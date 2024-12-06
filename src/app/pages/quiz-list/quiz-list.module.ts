import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { QuizListComponent } from "./quiz-list.component";

@NgModule({
  declarations: [QuizListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule.forChild([{ path: "", component: QuizListComponent }]),
  ],
})
export class QuizListModule {}
