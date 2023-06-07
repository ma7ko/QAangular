import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, CREATE_URL, DELETE_URL, QUESTIONS_URL, UPDATE_URL } from '../route-constants/route-constants';
import { Question } from 'src/model/question/Question';
import { BaseTermService } from '../base-term-service/base-term.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseTermService {

  constructor(private httpCient: HttpClient,
              private _userService: UserService) {
    super(httpCient);
    this.term = QUESTIONS_URL;
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

  public listQuestions(page: number): Observable<any> {
    const headers = this.buildHeaders();
    var queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('size', 2);
    return this.httpCient.get(`${API_URL}/${QUESTIONS_URL}`, {headers: headers, params: queryParams});
  }

  public findQuestion(questionId: number): Observable<any> {
    const headers = this.buildHeaders();
    return this.httpCient.get(`${API_URL}/${QUESTIONS_URL}/${questionId}`, {headers: headers});
  }

  public createQuestion(question: Question): Observable<any> {
    const headers = this.buildHeaders();
    return this.httpCient.post(`${API_URL}/${QUESTIONS_URL}/${CREATE_URL}`, question, {headers: headers});
  }

  public updateQuestion(question: Question): Observable<any> {
    const headers = this.buildHeaders();
    return this.httpCient.put(`${API_URL}/${QUESTIONS_URL}/${question.id}/${UPDATE_URL}`, question, {headers:headers});
  }

  public deleteQuestion(questionId: number): Observable<any> {
    const headers = this.buildHeaders();
    return this.httpCient.delete(`${API_URL}/${QUESTIONS_URL}/${questionId}/${DELETE_URL}`, {headers: headers});
  }
}
