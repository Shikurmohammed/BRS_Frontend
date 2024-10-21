import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../core/models/User';
import { UserService } from '../../core/services/user.service';
import { ErrorHandlerService } from './../../core/services/errorHandler.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  userService = inject(UserService);
  errorHandlerService = inject(ErrorHandlerService);
  errorMessage = '';
  @ViewChild('signupForm') form!: NgForm;
  user: User = new User(0, '', '', '', '', '', '', new Date(), '', '', '');
  onSubmit() {
    console.log(this.form.value);

    this.userService.addUser(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        let eMessage = this.errorHandlerService.getErrorMessage(err);
        if (eMessage.includes('Duplicate'))
          this.errorMessage = 'username already exist!';
        else this.errorMessage = eMessage;
      },
    });
  }
  activeRouter: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.activeRouter.data.subscribe((res) => {
      console.log(res);
    });
    //this.userService.fetchUser().subscribe({next:(res)=>console.log(res),error:(err)=>console.log(err)})
  }
}
