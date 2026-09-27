import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { AuthResponse } from './auth-response';
import { LoginRequest } from './login-request';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = '/api/auth';

  private readonly currentUser = signal<AuthResponse | null>(null);
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);

  async loadCurrentUser(): Promise<void> {
    try {
      this.currentUser.set(await firstValueFrom(this.getCurrentUser()));
    } catch {
      this.currentUser.set(null);
    }
  }

  private getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.baseUrl}/me`);
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, request)
      .pipe(tap((user) => this.currentUser.set(user)));
  }
}
