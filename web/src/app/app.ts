import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from './features/auth/auth';
import { AuthResponse } from './features/auth/auth-response';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly auth = inject(Auth);

  protected readonly user = signal<AuthResponse | null>(null);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (user) => this.user.set(user),
      error: (err: HttpErrorResponse) => this.error.set(`HTTP ${err.status}`),
    });
  }
}
