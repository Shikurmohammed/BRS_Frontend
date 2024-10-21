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
  userRole:string|null=null;
  onSubmit(form: NgForm) {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(form);
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.body.token?.toString());
        const role=res?.body?.roles[0]?.length >0 ? res.body.roles.replace(/[\[\]]/g,''):null;
        this.userRole=role?.trim();
        this.redirectUser();
      
      },
      error: (err) => {
      //  console.log("Login error",err);
        console.log("Error Code",err.status)
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
    this.authService.logout()
  }
  redirectUser(){
   
    console.log('Roles:',this.userRole)
    if(this.userRole){
       switch(this.userRole){
        case 'ADMIN': this.route.navigateByUrl('/admin-dashboard'); break;
        case 'LIBRARIAN': this.route.navigateByUrl('/librarian-dashboard'); break;
        case 'USER': this.route.navigateByUrl('/users-home'); break;
        case 'GUEST': this.route.navigateByUrl('/home');console.log('Gust home page'); break;
        default: this.route.navigateByUrl('/login'); break;
       }
    }
else{
        this.route.navigateByUrl('/login');
}
  }
 
}
