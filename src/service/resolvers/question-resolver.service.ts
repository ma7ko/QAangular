import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { QuestionService } from '../question-service/question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolverService implements Resolve<any> {

  constructor(private questionService: QuestionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.questionService.findQuestion(route.params['id']);
  }

}
