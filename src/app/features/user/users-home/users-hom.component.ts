import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Material } from '../../../core/material';
import { Book } from '../../../core/models/Book';
import { BookListComponent } from "../../../pages/book-mamangement/book-list/book-list.component";
import { BorrowBookComponent } from "../../../pages/book-transaction/borrow-book/borrow-book.component";
import { BorrowRequestsComponent } from '../../../pages/book-transaction/borrow-requests/borrow-requests.component';
import { FooterComponent } from '../../../pages/footer/footer.component';
import { HeaderComponent } from '../../../pages/header/header.component';
import { MenuItem, SidenavComponent } from "../../../pages/sidenav/sidenav.component";
@Component({
  selector: 'users-hom',
  standalone: true,
  imports: [Material, RouterModule, BookListComponent, HeaderComponent, FooterComponent, BorrowRequestsComponent, BorrowBookComponent, SidenavComponent],
  templateUrl: './users-hom.component.html',
  styleUrl: './users-hom.component.css',
})
export class UsersHomComponent {

  //properties
  dayLight:boolean=true;
  book:Book=null;
  @ViewChild('sidenav') sidenav:MatSidenav;
  isSidenavClosed=signal(false);
  menuItems= signal<MenuItem[]>([
    {
      routeLink: 'books',
      icon: 'fal fa-box-open',
      label: 'Books',
    },
    {
      routeLink: 'rents',
      icon: 'fal fa-box-open',
      label: 'Rents',
    },
    {
      routeLink: 'requests',
      icon: 'fal fa-box-open',
      label: 'Request',
    },
    {
      routeLink: '/login',
      icon: 'fal fa-sign-out',
      label: 'Logout',
      queryParam: { logout: true },
    },
  ]);

  //methods
  toggleDayNight(){
     this.dayLight=!this.dayLight;
  }

  toggleSidenav(){
    this.sidenav.toggle();
   // this.sidenav.opened?this.isSidenavClosed=false:this.isSidenavClosed=true;
  }
  alert(){
    console.log('clicked')
  }
  sideNavSize=computed(()=>this.isSidenavClosed()?'164':'260')



}
