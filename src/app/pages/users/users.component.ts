import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User } from './../../core/models/User';
import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports:[CommonModule]
})
export class UsersComponent {
deleteUser(arg0: any) {
throw new Error('Method not implemented.');
}
editUser(arg0: any) {
throw new Error('Method not implemented.');
}
 userService:UserService=inject(UserService);
 user:User;
 users:User[];
 
  ngOnInit(){
 
     this.userService.fetchUser()
     .subscribe({next:(res)=>{
  
      this.users= res
      console.log(res)
     },error:(err)=>{ 
       console.log(err)}})
  }
}
