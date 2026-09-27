import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../auth';
import { LoginRequest } from '../login-request';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly model = signal<LoginRequest>({ email: '', password: '' });
  protected readonly serverError = signal<string | null>(null);

  protected readonly loginForm = form(
    this.model,
    (schema) => {
      required(schema.email, { message: 'Email is required.' });
      email(schema.email, { message: 'Enter a valid email address.' });
      required(schema.password, { message: 'Password is required.' });
    },
    {
      submission: {
        action: async () => {
          this.serverError.set(null);

          try {
            await firstValueFrom(this.auth.login(this.model()));

            const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ?? '/';
            await this.router.navigateByUrl(returnUrl);
          } catch (error) {
            this.serverError.set(
              error instanceof HttpErrorResponse && error.status === 401
                ? 'Invalid email or password.'
                : 'Something went wrong. Please try again.',
            );
          }
        },
      },
    },
  );
}
