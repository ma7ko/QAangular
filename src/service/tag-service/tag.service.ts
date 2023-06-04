import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, CREATE_URL, DELETE_URL, QUESTIONS_URL, SEARCH_TAGS_URL, TAGS_URL } from '../route-constants/route-constants';
import { Tag } from 'src/model/tag/Tag';
import { Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient, 
              private _userService: UserService) { }

  protected buildHeaders(): HttpHeaders { 
    var httpHeaders: HttpHeaders = new HttpHeaders();
    this._userService.loggedUser();
    this._userService.loggedUser$.subscribe(user => {
        httpHeaders = new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer' + ' ' + user.accessToken
         });
    });

    return httpHeaders;
  }

  public getTags(): Observable<Tag[]> {
    const headers = this.buildHeaders();
    return this.httpClient.get<Tag[]>(`${API_URL}/${TAGS_URL}`, {headers: headers});
  }

  public findTagsContaining(pattern: string) {
    const headers = this.buildHeaders();
    return this.httpClient.get<Tag[]>(`${API_URL}/${QUESTIONS_URL}/${SEARCH_TAGS_URL}/${pattern}`, {headers: headers});
  }

  public findTagsByQuestionId(questionId: number) {
    const headers = this.buildHeaders();
    return this.httpClient.get(`${API_URL}/${QUESTIONS_URL}/${questionId}/${TAGS_URL}`, {headers: headers});
  }

  public addTag(tag: Tag) {
    const headers = this.buildHeaders();
    return this.httpClient.post(`${API_URL}/${TAGS_URL}/${CREATE_URL}`, tag, {headers: headers});
  }

  public deleteTag(tagID: number) {
    const headers = this.buildHeaders();
    return this.httpClient.delete(`${API_URL}/${TAGS_URL}/${tagID}/${DELETE_URL}`, {headers: headers});
  }
}
