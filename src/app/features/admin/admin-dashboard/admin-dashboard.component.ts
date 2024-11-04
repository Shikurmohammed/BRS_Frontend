import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Material } from '../../../core/material';
import { FooterComponent } from '../../../pages/footer/footer.component';
import { MenuItem, SidenavComponent } from '../../../pages/sidenav/sidenav.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Material,SidenavComponent,RouterModule,FooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent{

  @ViewChild('sidenav') sidenav:MatSidenav;
  isSidenavClosed=signal(false);
  toggleSidenav(){
    this.sidenav.toggle();
   // this.sidenav.opened?this.isSidenavClosed=false:this.isSidenavClosed=true;
  }
  sideNavSize=computed(()=>this.isSidenavClosed()?'164':'260')
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
      routeLink: 'users',
      icon: 'fal fa-users',
      label: 'Users',

    },
    
    {
      routeLink:'logs',
      icon:'fa fa-history',
      label:'Log'
    },
    {
      routeLink: '/login',
      icon: 'fal fa-sign-out',
      label: 'Logout',
      queryParam: { logout: true },
    },
  ]);


}
