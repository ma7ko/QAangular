import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { QuestionService } from '../question-service/question.service';
import { Observable, filter, forkJoin, map } from 'rxjs';
import { TagService } from '../tag-service/tag.service';

export const questionResolver: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {

  const questionService = inject(QuestionService);
  const tagService = inject(TagService);

  return forkJoin([questionService.findQuestion(route.params['id']), tagService.getTags()]).
            pipe(map((i) => {
                const allTags = i[1].map(j => j.name);
                const searchedTags = allTags.filter(j => !i[0]['tags'].includes(j));
                return [i[0], searchedTags];
            }));
};