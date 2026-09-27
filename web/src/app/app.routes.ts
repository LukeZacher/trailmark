import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/job-applications',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'job-applications',
    loadComponent: () =>
      import('./features/job-applications/job-application-list/job-application-list').then(
        (m) => m.JobApplicationList,
      ),
    canActivate: [authGuard],
  },
];
