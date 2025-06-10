import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { startsWith } from '@onecx/angular-webcomponents';

export const standaloneRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
];

export const remoteRoutes: Routes = [
  {
    matcher: startsWith(''),
    component: HomeComponent,
  },
  {
    matcher: startsWith('detail'),
    component: DetailComponent,
  },
];