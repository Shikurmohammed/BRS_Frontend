import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from "../../common/search/search.component";
import { Material } from '../../core/material';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true,
  imports: [RouterLink, SearchComponent,Material],
  encapsulation:ViewEncapsulation.None
 
})
export class HeaderComponent{
  constructor(public authService:AuthService){}

  toggleSidenav(){
    //this.sidenav.toggle();
   // this.sidenav.opened?this.isSidenavClosed=false:this.isSidenavClosed=true;
  }
}
