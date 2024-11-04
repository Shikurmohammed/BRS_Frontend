import { Component, computed, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Material } from '../../core/material';
import { MenuItem } from '../../core/models/Menu';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule,Material],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  isSidenavClosed=signal(false);
  @Input() set collapsed(val:boolean){
    this.isSidenavClosed.set(val)
  }
  
  profilePicSize=computed(()=>this.isSidenavClosed()?'32':'100')

  items= signal<MenuItem[]>([]);
  @Input() set menus(val:MenuItem[]){
    this.items.set(val);
  }
}
export { MenuItem };

