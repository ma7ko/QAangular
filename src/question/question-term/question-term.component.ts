import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import { Question } from 'src/model/question/Question';
import { QuestionService } from 'src/service/question-service/question.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-question-term',
  templateUrl: './question-term.component.html',
  styleUrls: ['./question-term.component.css']
})
export class QuestionTermComponent implements OnInit, OnDestroy {

  @Input('questionTerm')
  question: Question = {};

  @Output()
  deleteQuestionEmitter = new EventEmitter<number>();

  @Output()
  reactedToQuestion = new EventEmitter<boolean>();

  paramMap: Observable<ParamMap> = new Observable<ParamMap>();
  routeSubscription: Subscription = new Subscription();
  questionId: string = '';

  constructor(private activatedRoute: ActivatedRoute, 
              protected _userService: UserService,
              private _questionService: QuestionService) { }

  ngOnInit(): void {
    this._userService.loggedUser();
    this.paramMap = this.activatedRoute.paramMap;
    this.routeSubscription = this.paramMap.subscribe((params) => {
      this.questionId = params.get('id') ?? '';
    });
  }

  like(event: Event) {
    this._userService.subscribeToUser();
    if (this.question.id && this._userService.user.username) {
      this._questionService.likeBy(this.question.id, this._userService.user.username).subscribe(response => {
        console.log(response);
        this.reactedToQuestion.emit(true);
      });
    }
  }

  dislike(event:Event) {
    this._userService.subscribeToUser();
    if (this.question.id && this._userService.user.username) {
      this._questionService.dislikeBy(this.question.id, this._userService.user.username).subscribe(response => {
        console.log(response);
        this.reactedToQuestion.emit(true);
      });
    }
  }

  onDelete(isConfirm: boolean, questionId: number | undefined) {
    console.log(questionId);
    return;
    /*if (isConfirm && questionId)
      this._questionService.deleteQuestion(questionId).subscribe((response) => {
        location.reload();
      });*/
  } 

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  
}
