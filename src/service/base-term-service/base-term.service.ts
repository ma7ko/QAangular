import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../route-constants/route-constants';

@Injectable({
  providedIn: 'root'
})
export class BaseTermService {

  term: string = '';

  constructor(protected httpClient: HttpClient) { }

  protected buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
  }

  public likeBy(termId: number, userId: string): Observable<any> {
    const headers = this.buildHeaders();
    return this.httpClient.get(`${API_URL}/${this.term}/${termId}/like-by/${userId}`, {headers: headers});
  }

  public dislikeBy(termId: number, userId: string): Observable<any> {
    const headers = this.buildHeaders();
    return this.httpClient.get(`${API_URL}/${this.term}/${termId}/dislike-by/${userId}`, {headers: headers});
  }
}
