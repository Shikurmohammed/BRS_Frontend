import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  standalone:true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterLink, HeaderComponent,FooterComponent],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class HomeComponent {


}
