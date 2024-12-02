import { Component, EventEmitter, Inject, output, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Question } from "../../../services/quiz.service";

interface DialogData {
  mode: "create" | "edit";
  question?: Question;
}

@Component({
  selector: "app-question-form-dialog",
  templateUrl: "./question-form-dialog.component.html",
  styleUrl: "./question-form-dialog.component.css",
})
export class QuestionFormDialogComponent {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<QuestionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.questionForm = this.fb.group({
      sentence: [data.question?.sentence || "", Validators.required],
      response: [data.question?.response || "", Validators.required],
    });
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const question: Question = {
        ...this.questionForm.value,
        responseLevel: this.data.question?.responseLevel || "UNKNOWN",
      };
      this.dialogRef.close(question);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
