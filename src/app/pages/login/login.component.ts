import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = true;
  route: Router = inject(Router);
  activeRoute:ActivatedRoute=inject(ActivatedRoute);
  
  onSubmit(form: NgForm) {
    this.isLoggedIn = !this.isLoggedIn;
    //console.log(form.value);
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        //console.log(res.body.token);
        //console.log(localStorage.getItem('token'))
      //  this.authService.saveToken(res.body.token?.toString())
        this.route.navigateByUrl('/dashboard/books');
      },
      error: (err) => {
       if(err.status=401)
         console.log('Unauthorized access, Invalid credentials provided')
        else
        console.log('Login failed!', err);
      },
    });
   // form.reset();
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
  
 
}
