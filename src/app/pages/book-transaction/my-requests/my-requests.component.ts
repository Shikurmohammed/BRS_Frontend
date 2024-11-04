import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BorrowRequest } from '../../../core/models/borrowRequest';
import { BorrowRequestService } from '../../../core/services/borrowRequest.service';
export class ChildClass {
  name:string='test'

}
@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})

export class MyRequestsComponent  implements OnInit {
  requestService:BorrowRequestService=inject(BorrowRequestService);
  requestList:BorrowRequest[]=[];
  errorMessage:string|null=null;

  getRentsByUserId(){
    this.requestService.fetchRequestsByRequesterId().subscribe({
      next: (res: BorrowRequest[]) => {
        this.requestList = res;
        console.log(this.requestList)
      },
      error: (err) => {
        this.errorMessage=err;
      },
    });
    
  }

  ngOnInit(): void {
   this.getRentsByUserId()
  }


}


