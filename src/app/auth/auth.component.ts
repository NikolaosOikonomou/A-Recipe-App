import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  onSwtichMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log(form);
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
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        //this.fadeOutMessage();
      },
      complete: () => {
        this.isLoading = false;
        this.isLoggedIn = true;
        //this.fadeOutMessage();
      },
    });
    form.reset();
  }

  closeModal() {
    this.error = null;
  }

  //Call this function to close error/success message automatically(Outdated)
  fadeOutMessage() {
    setTimeout(() => {
      this.error = null;
      this.isLoggedIn = false;
    }, 4000);
  }
}
