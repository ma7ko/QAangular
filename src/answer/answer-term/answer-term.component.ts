import { Component, Input, ViewChild } from '@angular/core';
import { Answer } from 'src/model/answer/Answer';
import { AnswerService } from 'src/service/answer-service/answer.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-answer-term',
  templateUrl: './answer-term.component.html',
  styleUrls: ['./answer-term.component.css']
})
export class AnswerTermComponent {

isEdit = false;
isLoading = false;

@ViewChild('editForm') editForm: any;

onAnswerDelete(event: boolean) {
  if (this.term.id)
    this._answerService.deleteAnswer(this.term.id).subscribe((response) => {
      location.reload();
    });
}

onAnswerEdit(arg0: any) {
this.isEdit = !this.isEdit;
}
questionId: any;

@Input()
term: Answer = {};

ngOnInit() {
  console.log(this.term);
}

constructor(private _answerService: AnswerService, protected _userService: UserService) {}

like(event: Event) {
  this._userService.subscribeToUser();
  if (this.term.id && this._userService.user.username) {
    this._answerService.likeBy(this.term.id, this._userService.user.username).subscribe(response => {
      this.term = response;
    });
  }
}

dislike(event:Event) {
  this._userService.subscribeToUser();
  if (this.term.id && this._userService.user.username) {
    this._answerService.dislikeBy(this.term.id, this._userService.user.username).subscribe(response => {
      this.term = response;
    });
  }
}

updateAnswer(event: Event) {
  this.isLoading = true;
  this.term.explanation = this.editForm.explanation;
  this._answerService.updateAnswer(this.term).subscribe((response) => {
    console.log("Successfully updated answer");
    console.log(response);
    this.isLoading = false;
    this.isEdit = false;
    this.term = response;
  }, (error) => {
    console.log('there was an error updating answer');
    this.isLoading = false;
    this.isEdit = false
  });
}

}
