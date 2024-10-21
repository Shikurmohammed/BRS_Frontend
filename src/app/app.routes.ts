import { Routes } from '@angular/router';
import { CanActivate } from './core/guards/auth.guard';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { BooksComponent } from './pages/books/books.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { librarianDashboardComponent } from './features/librarian/librarian-dashboard/librarian-dashboard.component';
import { UsersHomComponent } from './features/user/users-home/users-hom.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RentComponent } from './pages/rent/rent.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  { path: 'login', component:LoginComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
 {
  path: 'admin-dashboard',
  component: AdminDashboardComponent,canActivate:[CanActivate],
    children: [
      { path: 'books', component: BooksComponent , canDeactivate:[(comp:BooksComponent)=>{return comp.canExit()}] },
      { path: 'rents', component: RentComponent },//, resolve:{rents:resolve},resolve:{books:resolve},
      { path: 'users', component:UsersComponent}
    ],
  },
  { path: 'librarian-dashboard', component: librarianDashboardComponent,},
  { path: 'users-home', component: UsersHomComponent,},

  { path: 'signup', component: SignupComponent,data:{name:'test name', password:'test pass'}},
  { path: 'pages', component: PageNotFoundComponent,},
  {path:'**', component:PageNotFoundComponent}
];
