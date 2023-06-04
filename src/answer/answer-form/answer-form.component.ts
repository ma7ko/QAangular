import { Component, Input } from '@angular/core';
import { Answer } from 'src/model/answer/Answer';
import { AnswerService } from 'src/service/answer-service/answer.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent {

  @Input()
  numberOfRows: number = 3;

  @Input()
  explanation: string = '';
  
  @Input()
  questionId: number = 1;

  @Input()
  username: string = '';

  constructor(private _answerService: AnswerService) {}

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.username);
    const answerDTO: Answer = {
      explanation: this.explanation,
      likes: 0,
      dislikes: 0,
      questionId: this.questionId,
      username: this.username
    };

    this._answerService.addAnswer(answerDTO).subscribe((success) => {
      console.log('Successfully added answer');
    }, (error) => {
      console.log('There was an error adding answer');
      console.log(error);
    });

  }
}
