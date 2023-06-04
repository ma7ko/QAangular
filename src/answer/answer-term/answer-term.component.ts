import { Component, Input } from '@angular/core';
import { Answer } from 'src/model/answer/Answer';

@Component({
  selector: 'app-answer-term',
  templateUrl: './answer-term.component.html',
  styleUrls: ['./answer-term.component.css']
})
export class AnswerTermComponent {
onAnswerDelete(arg0: any,arg1: any) {
throw new Error('Method not implemented.');
}
onAnswerEdit(arg0: any) {
throw new Error('Method not implemented.');
}
questionId: any;

@Input()
term: Answer = {};

}
