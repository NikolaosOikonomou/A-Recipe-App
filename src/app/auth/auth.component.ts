import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
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
    this.isLoading = true;
    if (this.isLoginMode) {
      //
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
