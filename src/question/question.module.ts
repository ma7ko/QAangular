import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionTermComponent } from './question-term/question-term.component';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerModule } from 'src/answer/answer.module';


@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionDetailsComponent,
    QuestionFormComponent,
    QuestionTermComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ReactiveFormsModule,
    AnswerModule,
    SharedModule
  ]
})
export class QuestionModule { }
