import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}
  onSwtichMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.isLoggedIn = true;
      },
    });
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
