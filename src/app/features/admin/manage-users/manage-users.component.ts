import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { UserDetailsComponent } from '../../../pages/user-management/user-details/user-details.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  constructor(private dialog:MatDialog){}
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
      viewDetails(record: any) {
        console.log(record)
        const dialogRef = this.dialog.open(UserDetailsComponent, {
          data: record,
          width:'400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        });
      }
}
