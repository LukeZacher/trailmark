import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { LoginRequest } from '../login-request';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  protected readonly model = signal<LoginRequest>({ email: '', password: '' });

  protected readonly loginForm = form(this.model, (schema) => {
    required(schema.email, { message: 'Email is required.' });
    email(schema.email, { message: 'Enter a valid email address.' });
    required(schema.password, { message: 'Password is required.' });
  });

  protected onSubmit(): void {
    if (this.loginForm().valid()) {
      console.log(this.loginForm().value());
    }
  }
}
