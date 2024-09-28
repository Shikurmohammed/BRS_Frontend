import { Component, inject, OnInit } from '@angular/core';
import { RentService } from '../../services/Rent.service';
import { TestDirectiveDirective } from '../../test-directive.directive';
export class ChildClass {
  name:string='test'

}
@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [TestDirectiveDirective],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})

export class RentComponent extends ChildClass implements OnInit {
  rentService:RentService=inject(RentService);
  getAllRents(){
    this.rentService.fetchRents().subscribe((data)=>{
      console.log(data)
    })
  }
  ngOnInit(): void {
   this.getAllRents()
  }

placeholder:string='Enter here...';
togglePlaceHolder(){
  this.placeholder='Enter your name here';
}
 

}


