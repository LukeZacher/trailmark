import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);

  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>('/api/auth/me', { withCredentials: true });
  }
}
