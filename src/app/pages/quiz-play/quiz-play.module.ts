import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuizPlayComponent } from './quiz-play.component';

@NgModule({
  declarations: [QuizPlayComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    RouterModule.forChild([{ path: '', component: QuizPlayComponent }])
  ]
})
export class QuizPlayModule { }