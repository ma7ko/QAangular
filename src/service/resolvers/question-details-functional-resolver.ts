import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { QuestionService } from '../question-service/question.service';
import { Observable, forkJoin } from 'rxjs';
import { AnswerService } from '../answer-service/answer.service';

export const questionDetailsResolver: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {

  const questionService = inject(QuestionService);
  const answerService = inject(AnswerService);

  return forkJoin([answerService.findAnswersByQuestionId(route.params['id'], 0), 
                    questionService.findQuestion(route.params['id'])]);
};