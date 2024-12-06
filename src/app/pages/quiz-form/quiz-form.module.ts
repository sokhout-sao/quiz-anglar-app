import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { QuestionFormDialogComponent } from "./question-form-dialog/question-form-dialog.component";
import { QuizFormComponent } from "./quiz-form.component";

@NgModule({
  declarations: [QuizFormComponent, QuestionFormDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forChild([{ path: "", component: QuizFormComponent }]),
  ],
})
export class QuizFormModule {}
