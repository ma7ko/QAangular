import { Component, OnInit, ViewChild } from '@angular/core';
import { AnswerService } from 'src/service/answer-service/answer.service';
import { Answer } from 'src/model/answer/Answer';
import { Question } from 'src/model/question/Question';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user-service/user.service';
import { QuestionService } from 'src/service/question-service/question.service';
import { PageableService } from 'src/service/pageable-service/pageable.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  question: Question = {};
  answerList: Answer[] = [];

  @ViewChild('addForm') addForm: any;
  
  constructor(private _questionService: QuestionService, 
              private answerService: AnswerService, 
              private _route: ActivatedRoute, 
              private _pageableService: PageableService,
              protected _userService: UserService) {}

  ngOnInit() {
    this._userService.loggedUser();
    if ( this._route.snapshot.data["questionDetails"].length > 0 ) {
      this.answerList = this._route.snapshot.data["questionDetails"][0].content;
      console.log(this._route.snapshot.data["questionDetails"][0]);
      this.question = this._route.snapshot.data["questionDetails"][1];
    }
  }

  reloadAnswers(event: boolean) {
    if (this.question.id) 
      this.answerService.findAnswersByQuestionId(this.question.id, 0).subscribe((response: any) => {
        console.log(this.answerList);
        this.answerList = response.content;
        this.addForm.explanation = '';
      }, (error) => {
        console.log(error);
    });
  }

  like(event: Event) {
    this._userService.subscribeToUser();
    if (this.question.id && this._userService.user.username) {
      this._questionService.likeBy(this.question.id, this._userService.user.username).subscribe(response => {
        this.question = response;
      });
    }
  }

  dislike(event:Event) {
    this._userService.subscribeToUser();
    if (this.question.id && this._userService.user.username) {
      this._questionService.dislikeBy(this.question.id, this._userService.user.username).subscribe(response => {
        this.question = response;
      });
    }
  }

}
