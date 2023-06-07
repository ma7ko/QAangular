import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseTermService } from '../base-term-service/base-term.service';
import { ANSWERS_URL, API_URL, CREATE_URL, DELETE_URL, QUESTIONS_URL, UPDATE_URL } from '../route-constants/route-constants';
import { Answer } from 'src/model/answer/Answer';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends BaseTermService {

  constructor(httpClient: HttpClient, 
              private _userService: UserService) {
    super(httpClient);
    this.term = ANSWERS_URL;
  }

  protected override buildHeaders(): HttpHeaders { 
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

  public findAnswersByQuestionId(questionId: number, page: number) {
    const headers = this.buildHeaders();
    var queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', 2);
    return this.httpClient.get(`${API_URL}/${QUESTIONS_URL}/${questionId}/${ANSWERS_URL}`, {headers: headers, params: queryParams});
  }

  public findAnswerById(answerId: number) {
    const headers = this.buildHeaders();
    return this.httpClient.get(`${API_URL}/${ANSWERS_URL}/${answerId}`, {headers: headers});
  }

  public addAnswer(answer: Answer) {
    const headers = this.buildHeaders();
    return this.httpClient.post(`${API_URL}/${ANSWERS_URL}/${CREATE_URL}`, answer, {headers: headers});
  }

  public updateAnswer(answer: Answer) {
    const headers = this.buildHeaders();
    return this.httpClient.put(`${API_URL}/${ANSWERS_URL}/${answer.id}/${UPDATE_URL}`, answer, {headers: headers});
  }

  public deleteAnswer(answerId: number) {
    const headers = this.buildHeaders();
    return this.httpClient.delete(`${API_URL}/${ANSWERS_URL}/${answerId}/${DELETE_URL}`, {headers: headers});
  }
}
