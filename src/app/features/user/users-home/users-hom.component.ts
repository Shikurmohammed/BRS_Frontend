import { Component } from '@angular/core';
import { Material } from '../../../core/material';
@Component({
  selector: 'users-hom',
  standalone: true,
  imports: [Material],
  templateUrl: './users-hom.component.html',
  styleUrl: './users-hom.component.css'
})
export class UsersHomComponent {
logTabs(selectedTab) {
console.log(selectedTab)
}
  opened=false;
  log(state){
    console.log(state)
  }




}
