import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { User } from 'src/model/user/User';
import { AuthService } from '../auth-service/auth.service';
import { LogInRequest } from '../auth-service/payload/login-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedUserSubject = new BehaviorSubject<User>({});
  loggedUser$: Observable<User> = this.loggedUserSubject.asObservable();
  user: User = {};

  constructor(private _authService: AuthService, 
              private _router: Router) {
    this.loggedUser();
  }

  private success(response: any) {
      if (response.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response));
        this.loggedUser();
        this._router.navigate(['/']);
      }
  }

  private error(error: any) {
      console.error('There was an error logging in.');
  }

  public async logIn(loginRequest: LogInRequest) {
    const result = await lastValueFrom(this._authService.login(loginRequest));
    console.log(result);
    if (result['accessToken']) {
      this.success(result);
    }
   /*this._authService.login(loginRequest).subscribe({
      next: this.success,
      error: this.error 
    });*/
    return result;
  }

  public loggedUser() {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      this.loggedUserSubject.next(parsedUser);
    }
  }

  public subscribeToUser() {
    this.loggedUser$.subscribe((result) => {
      this.user = result;
    });
  }

  public logoutUser() {
    sessionStorage.removeItem("user");
    this.loggedUserSubject.next({});
    location.reload();
  }

}
