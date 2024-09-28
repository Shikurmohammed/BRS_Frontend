import { Routes } from '@angular/router';
import { CanActivate, resolve } from './guards/auth.guard';
import { BooksComponent } from './pages/books/books.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RentComponent } from './pages/rent/rent.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 {
  path: 'dashboard',
  component: DashboardComponent,canActivate:[CanActivate]},
  {
    path: 'dashboard',
    component: DashboardComponent,canActivateChild:[CanActivate],
    children: [
      { path: 'books', component: BooksComponent ,resolve:{books:resolve}, canDeactivate:[(comp:BooksComponent)=>{return comp.canExit()}] },//, canActivate:[CanActivate]
      { path: 'rent', component: RentComponent },
    ],
  },
  { path: 'signup', component: SignupComponent,data:{name:'test name', password:'test pass'}},
 
  {path:'**', component:PageNotFoundComponent}
];
