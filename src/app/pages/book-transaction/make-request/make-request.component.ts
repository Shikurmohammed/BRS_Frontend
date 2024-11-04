import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../../core/material';
import { BorrowRequestService } from '../../../core/services/borrowRequest.service';

@Component({
  selector: 'app-make-request',
  standalone: true,
  imports: [Material],
  templateUrl: './make-request.component.html',
  styleUrl: './make-request.component.css'
})
export class MakeRequestComponent {
   borrowRequest= inject(BorrowRequestService)
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
  } 

  submitRequest(book_id:number)
{
  this.borrowRequest.addRequest(book_id).subscribe({
    next:(res)=>{ console.log(res)}, error:(err)=>{console.log(err)}
  });
}
}
