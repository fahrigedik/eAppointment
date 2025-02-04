import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { DoctorsComponent } from './components/doctors/doctors.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutsComponent,
    canActivate : [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path:'doctors',
        component: DoctorsComponent,
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
