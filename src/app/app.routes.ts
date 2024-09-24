import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivate } from './guards/auth-guard.guard';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
 { path: 'login', component: AuthLayoutComponent, children:[
  { path: '', component: LoginComponent },
 ] },
  {
    path: 'dashboard',
    component: DashboardComponent,canActivateChild:[CanActivate],
    children: [
      { path: 'books', component: BooksComponent , canDeactivate:[(comp:BooksComponent)=>{return comp.canExit()}] },//, canActivate:[CanActivate]
      { path: 'pages', component: PagesComponent },
    ],
  },
  { path: 'signup', component: SignupComponent},
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
