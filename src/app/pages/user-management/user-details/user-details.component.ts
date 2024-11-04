import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../../core/material';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [Material],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements AfterViewInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
  } 
  ngAfterViewInit(){
    console.log(this.data)
  }
}
