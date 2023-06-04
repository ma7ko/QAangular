import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth-service/auth.service';
import { RegisterRequest } from 'src/service/auth-service/payload/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public responseSuccess = false;
  public responseMessage = '';

  public registerFormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _authService: AuthService, private _router: Router) { }

  public submitForm(event: Event) {
    event.preventDefault();

    const registerRequest: RegisterRequest = this.preparePayload();
    this._authService.register(registerRequest).subscribe((resp) => {
      console.log('User registered successfully.');
      this._router.navigate(['/']);
      this.responseSuccess = true;
    }, (error) => {
      this.responseSuccess = false;
      this.responseMessage = error.error.message;
      console.log('There was an error registering user.');
      console.log(error);
    });

  }

  private preparePayload(): RegisterRequest {
    return {
      username: this.registerFormGroup.controls['username'].value ?? '',
      email: this.registerFormGroup.controls['email'].value ?? '',
      password: this.registerFormGroup.controls['password'].value ?? '',
    }
  }
}
