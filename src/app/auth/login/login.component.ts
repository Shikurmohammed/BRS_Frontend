import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ErrorHandlerService } from '../../core/services/errorHandler.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  errorHandlerService=inject(ErrorHandlerService);
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = true;
  route: Router = inject(Router);
  activeRoute:ActivatedRoute=inject(ActivatedRoute);
  errorMessage:string='';
  user_role:string|null=null;

  onSubmit(form: NgForm) {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(form);
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.body.token?.toString());
        const role=res?.body?.roles[0]?.length >0 ? res.body.roles.replace(/[\[\]]/g,''):null;
        this.user_role=role?.trim();
        this.redirectUser();
        localStorage.setItem('Role',this.user_role);
      },
      error: (err) => {
        console.log("Error Code",err)
         if(err?.status==0)
          this.errorMessage="Network error: Unable to reach the server.";
        else
         this.errorMessage=err;
      },
    },
  );
  form.reset();
  }

  ngOnInit(){
    this.activeRoute.queryParamMap.subscribe((queries)=>{
      const logout= Boolean (queries.get('logout'));
      if(logout){
        this.authService.logout();
      }
    })
  }
  logout(){
    this.authService.logout();
  }
  redirectUser(){
    if(this.user_role){
       switch(this.user_role){
        case 'ADMIN': this.route.navigateByUrl('/admin-dashboard'); break;
        case 'LIBRARIAN': this.route.navigateByUrl('/librarian-dashboard'); break;
        case 'USER': this.route.navigateByUrl('/users-home'); break;
        case 'GUEST': this.route.navigateByUrl('/home'); break;
        default: this.route.navigateByUrl('/login'); break;
       }
    }
else{
        this.route.navigateByUrl('/login');
}
  }
 
}
