import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { AnswerTermComponent } from './answer-term/answer-term.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    AnswerFormComponent,
    AnswerTermComponent
  ],
  imports: [
    CommonModule,
    AnswerRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    AnswerFormComponent,
    AnswerTermComponent
  ]
})
export class AnswerModule { }
