import { Routes } from '@angular/router';
import { RouteNotFoundComponent } from '@shared/components/route-not-found/route-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '404',
    component: RouteNotFoundComponent
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
