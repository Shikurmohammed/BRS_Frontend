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
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.css'
})

export class MyRentalComponent extends ChildClass implements OnInit {
  rentService:RentService=inject(RentService);
  rentList:Rent[]=[];
  errorMessage:string|null=null;

  getRentsByUserId(){
    this.rentService.getRentsByUserId().subscribe({
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
   this.getRentsByUserId()
   this.rentService.errorSubject.subscribe({next:(httpError)=>{
    console.log(httpError);
  }})
  }


}


