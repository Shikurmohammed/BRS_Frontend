import { Component, inject, Output } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, PageNotFoundComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @Output() isLoading: boolean = false;//this.getLoaderValue();
 
  router:Router=inject(Router);
  ngOnInit(){
   
    
    this.router.events.subscribe((routerEvent)=>{
   //   console.log(routerEvent)
      if(routerEvent instanceof NavigationStart){
        this.isLoading=true;
      }
      if(routerEvent instanceof NavigationEnd ||
         routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError){
        this.isLoading=false;
      }
    })
}



}
