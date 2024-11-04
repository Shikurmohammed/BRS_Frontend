import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Material } from '../../../core/material';
import { BorrowRequest } from '../../../core/models/borrowRequest';
import { BorrowRequestService } from '../../../core/services/borrowRequest.service';

@Component({
  selector: 'app-borrow-requests',
  standalone: true,
  imports: [Material,CommonModule],
  templateUrl: './borrow-requests.component.html',
  styleUrl: './borrow-requests.component.css'
})
export class BorrowRequestsComponent implements OnInit{

  requestService:BorrowRequestService=inject(BorrowRequestService);
    requestList:BorrowRequest[]=[];
    errorMessage:string|null=null;
  

  submitBorrowRequest(data:number) {
    console.log(data)
   this.requestService.addRequest(data).subscribe((res)=>{console.log(res)})
    }

  
    getBorrowRequests(){
      this.requestService.fetchRequests().subscribe({
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
     this.getBorrowRequests()
    }
  
    approve(id: number) {
      this.requestService.approveRequest(id).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>{console.log(err)}
     })
      }
      reject(id: number) {
        this.requestService.rejectRequest(id).subscribe({
        next:(res)=>{console.log(res)},
        error:(err)=>{console.log(err)}
       })
        }
}
