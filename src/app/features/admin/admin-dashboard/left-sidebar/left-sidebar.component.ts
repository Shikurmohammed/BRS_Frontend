import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  showBar:boolean=false;
  items = [
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
      routeLink: 'users',
      icon: 'fal fa-users',
      label: 'Users',

    },
    {
      routeLink: '/login',
      icon: 'fal fa-sign-out',
      label: 'Logout',
      queryParam: { logout: true },
    
    },
  ];
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
    this.showBar=!this.showBar;
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
    this.showBar=!this.showBar;
  }
}
