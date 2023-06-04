import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/service/auth-service/auth.service';
import { LogInRequest } from 'src/service/auth-service/payload/login-request';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  public responseMessage = '';

  public loginFormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _authService: AuthService, 
              private _userService: UserService) {}

  public submitForm(event: Event) {
    event.preventDefault();

    const loginRequest: LogInRequest = this.preparePayload();
    
    const result = this._userService.logIn(loginRequest);
    result.then((response) => this.handleResponse(response));
  }

  public handleResponse(response: any) {
    if (response['ok'] == false) {
      this.responseMessage = response['error']['message'];
    }
  }

  private preparePayload(): LogInRequest {
    return {
      username: this.loginFormGroup.controls['username'].value ?? '',
      password: this.loginFormGroup.controls['password'].value ?? '',
    }
  }

  public getFacebookAccessToken() {
    // Not implemented yet.
  }

}
