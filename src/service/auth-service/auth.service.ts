import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { User } from 'src/model/user/User';
import { LogInRequest } from './payload/login-request';
import { FacebookLogInRequest } from './payload/facebook-login-request';
import { RegisterRequest } from './payload/register-request';
import { API_URL, AUTH_URL, FACEBOOK_URL, SIGN_IN_URL, SIGN_UP_URL } from '../route-constants/route-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUserSubject = new BehaviorSubject<User>({});
  loggedUser$: Observable<User> = this.loggedUserSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  protected buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
  }

  public login(logInRequest: LogInRequest) {
    const headers = this.buildHeaders();
    return this.httpClient.post(`${API_URL}/${AUTH_URL}/${SIGN_IN_URL}`, logInRequest, {headers: headers}).pipe(
      catchError(error => of(error))
  );
  }

  public facebookLogin(facebookLogInRequest: FacebookLogInRequest) {
    const headers = this.buildHeaders();
    return this.httpClient.post(`${API_URL}/${AUTH_URL}/${FACEBOOK_URL}/${SIGN_IN_URL}`, facebookLogInRequest, {headers:headers});
  }

  public register(registerRequest: RegisterRequest) {
    const headers = this.buildHeaders();
    return this.httpClient.post(`${API_URL}/${AUTH_URL}/${SIGN_UP_URL}`, registerRequest, {headers:headers});
  }

  public loggedUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedUserSubject.next(user);
  }

  public logout() {
    localStorage.removeItem('user');
    this.loggedUserSubject.next({});
  }
}
