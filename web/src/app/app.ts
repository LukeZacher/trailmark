import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './features/auth/auth';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly auth = inject(Auth);

  protected onLogout(): void {
    this.auth.logout().subscribe();
  }
}
