import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Rent } from '../../../core/models/Rent';
import { RentService } from '../../../core/services/Rent.service';
export class ChildClass {
  name:string='test'

}
@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-history.component.html',
  styleUrl: './rental-history.component.css'
})

export class RentalHistoryComponent extends ChildClass implements OnInit {
  rentService:RentService=inject(RentService);
  rentList:Rent[]=[];
  errorMessage:string|null=null;

  fetchRents(){
    this.rentService.fetchRents().subscribe({
      next: (res: Rent[]) => {
        this.rentList = res;
        console.log(this.rentList)
      },
      error: (err) => {
        this.errorMessage=err;
      },
    });
    
  }


  ngOnInit(): void {
   this.fetchRents()
   this.rentService.errorSubject.subscribe({next:(httpError)=>{
    console.log(httpError);
  }})
  }


}


