import { Component } from '@angular/core';
import { Material } from '../../../core/material';
import { BookListComponent } from "../book-list/book-list.component";
@Component({
  selector: 'users-hom',
  standalone: true,
  imports: [Material, BookListComponent],
  templateUrl: './users-hom.component.html',
  styleUrl: './users-hom.component.css',
})
export class UsersHomComponent {
  dayLight:boolean=true;
  toggleDayNight(){
this.dayLight=!this.dayLight;
  }


}
