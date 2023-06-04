import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/service/answer-service/answer.service';
import { Answer } from 'src/model/answer/Answer';
import { Question } from 'src/model/question/Question';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  question: Question = {};
  answerList: Answer[] = [];

  constructor(private answerService: AnswerService, private _route: ActivatedRoute, protected _userService: UserService) {}

  ngOnInit() {
    this._userService.loggedUser();
    if ( this._route.snapshot.data["questionDetails"].length > 0 ) {
      this.answerList = this._route.snapshot.data["questionDetails"][0];
      this.question = this._route.snapshot.data["questionDetails"][1];
    }
    
  }
}
