import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, concatMap, from, map, pluck, toArray } from "rxjs";
import { TagService } from "../tag-service/tag.service";

export const tagResolver: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {

    const tagService = inject(TagService);
    return tagService.getTags()
    .pipe(concatMap(arr => from(arr)))
    .pipe(map(tag => tag.name), toArray());
};