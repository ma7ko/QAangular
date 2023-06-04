import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { QuestionService } from '../question-service/question.service';
import { Observable, forkJoin } from 'rxjs';
import { AnswerService } from '../answer-service/answer.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionDetailsResolverService implements Resolve<any> {

  constructor(private questionService: QuestionService, private answerService: AnswerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([this.getAnswersObservable(route), this.getQuestionObservable(route)]);
  }

  private getQuestionObservable(route: ActivatedRouteSnapshot): Observable<any> {
    return this.questionService.findQuestion(route.params['id']);
  }

  private getAnswersObservable(route: ActivatedRouteSnapshot): Observable<any> {
    return this.answerService.findAnswersByQuestionId(route.params['id']);
  }
}
