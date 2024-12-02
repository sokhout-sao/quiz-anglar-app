import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { QuizFormComponent } from "./quiz-form.component";
import { QuestionFormDialogComponent } from "./question-form-dialog/question-form-dialog.component";

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
