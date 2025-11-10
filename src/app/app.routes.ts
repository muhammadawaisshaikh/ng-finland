import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'events/ngfinland2026',
    loadComponent: () => import('./features/events/ngFinland2026/ngFinland2026.component').then(m => m.NgFinland2026Component)
  },
  {
    path: 'submit',
    loadComponent: () => import('./features/call-for-papers/submit-call/submit-call.component').then(m => m.SubmitCallComponent)
  },
  {
    path: 'admin/call-for-papers',
    loadComponent: () => import('./features/call-for-papers/admin-view/admin-view.component').then(m => m.AdminViewComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
