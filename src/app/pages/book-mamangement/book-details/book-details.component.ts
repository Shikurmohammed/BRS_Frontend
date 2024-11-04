import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../../core/material';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [Material],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent  implements AfterViewInit{
constructor(@Inject(MAT_DIALOG_DATA) public data:any){
} 
ngAfterViewInit(){
  console.log(this.data)
}

}
