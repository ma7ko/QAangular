import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { AnswerTermComponent } from './answer-term/answer-term.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AnswerFormComponent,
    AnswerTermComponent
  ],
  imports: [
    CommonModule,
    AnswerRoutingModule,
    FormsModule
  ],
  exports: [
    AnswerFormComponent,
    AnswerTermComponent
  ]
})
export class AnswerModule { }
