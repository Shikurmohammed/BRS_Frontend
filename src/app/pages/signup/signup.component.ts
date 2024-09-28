import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SignUp } from '../../models/signup';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   URL:string='http://localhost:8080/api';
   
  http:HttpClient= inject(HttpClient);
  @ViewChild('signupForm') form!:NgForm;
   signUp:SignUp= new SignUp();
  onSubmit(){
  console.log(this.form.value)

  this.http.post(`${this.URL}/saveClient`,this.form.value).subscribe((response)=>{
    console.log(response)
  })
  }
  activeRouter:ActivatedRoute= inject(ActivatedRoute);
  ngOnInit(){
this.activeRouter.data.subscribe((res)=>{
console.log(res)
})
  }
}
