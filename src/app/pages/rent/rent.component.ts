import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Rent } from './../../core/models/Rent';
import { RentService } from './../../core/services/Rent.service';
export class ChildClass {
  name:string='test'

}
@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})

export class RentComponent extends ChildClass implements OnInit {
  rentService:RentService=inject(RentService);
  rentList:Rent[]=[];
  errorMessage:string|null=null;
 

  getAllRents(){
    this.rentService.fetchRents().subscribe({
      next: (res: Rent[]) => {
        console.log('Rent ')
        this.rentList = res;
      },
      error: (err) => {
        this.errorMessage=err;
        this.setErrorMessage(err)
        setTimeout(() => {
          this.errorMessage=null
        }, 2000);
      },
    });
    
  }

  private setErrorMessage(err:HttpErrorResponse){
    console.log('Setting error')
    console.log(err)
  }
  ngOnInit(): void {
   this.getAllRents()
   this.rentService.errorSubject.subscribe({next:(httpError)=>{
    console.log(httpError);
     this.setErrorMessage(httpError)
  }})
  }

placeholder:string='Enter here...';
togglePlaceHolder(){
  this.placeholder='Enter your name here';
}
 

}


