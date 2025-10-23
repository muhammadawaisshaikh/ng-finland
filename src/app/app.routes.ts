import { Routes } from '@angular/router';

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
    path: '**',
    redirectTo: ''
  }
];
