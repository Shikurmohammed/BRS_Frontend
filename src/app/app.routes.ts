import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CanActivate } from './core/guards/role.guard';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { ManageBooksComponent } from './features/admin/manage-books/manage-books.component';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';
import { librarianDashboardComponent } from './features/librarian/librarian-dashboard/librarian-dashboard.component';
import { UsersHomComponent } from './features/user/users-home/users-hom.component';
import { BooksComponent } from './pages/book-mamangement/books/books.component';
import { BorrowBookComponent } from './pages/book-transaction/borrow-book/borrow-book.component';
import { BorrowRequestsComponent } from './pages/book-transaction/borrow-requests/borrow-requests.component';
import { MyRentalComponent } from './pages/book-transaction/my-rentals/my-rentals.component';
import { MyRequestsComponent } from './pages/book-transaction/my-requests/my-requests.component';
import { RentalHistoryComponent } from './pages/book-transaction/rental-history/rental-history.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/log-management/error/error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
    children:[{path:'books',component:BooksComponent}],
    },//canActivate: [() => CanActivate('GUEST,USER,ADMIN,LIBRARIAN')],
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path:'logout',component:LogoutComponent},
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {path: 'books',
        component: ManageBooksComponent,
        canDeactivate: [
          (comp: ManageBooksComponent) => {
            return comp.canExit();
          },
        ],
      },
      { path: 'rents', component: RentalHistoryComponent }, 
      { path: 'users', component: ManageUsersComponent },
      { path: 'logs',component:ErrorComponent}
    ],
    canActivate: [() => CanActivate('ADMIN')],
  },
  {
    path: 'librarian-dashboard',
    component: librarianDashboardComponent,
    children: [
      {
        path: 'books',
        component: ManageBooksComponent,
        canDeactivate: [
          (comp: ManageBooksComponent) => {
            return comp.canExit();
          },
        ],
      },
      { path: 'rents', component: RentalHistoryComponent }, //, resolve:{rents:resolve},resolve:{books:resolve},
      { path: 'requests', component: BorrowRequestsComponent },
    ],
    canActivate: [() => CanActivate('ADMIN,LIBRARIAN')],
  },
  {
    path: 'users-home',
    component: UsersHomComponent,
    children: [
      { path: 'books', component: BorrowBookComponent },
      { path: 'rents', component: MyRentalComponent },
      { path: 'requests', component: MyRequestsComponent },
    ],
    canActivate: [() => CanActivate('USER,ADMIN,LIBRARIAN')],
  },
  { path: '**', component: PageNotFoundComponent },
];
