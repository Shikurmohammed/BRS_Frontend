import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Material } from '../../core/material';
import { Book } from '../../core/models/Book';
import { BookService } from '../../core/services/book.service';
import { SearchService } from '../../core/services/search.service';
import { BookListComponent } from "../book-mamangement/book-list/book-list.component";
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  standalone:true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterLink, HeaderComponent, FooterComponent, Material, CommonModule, BookListComponent],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent {

 constructor(private searchService:SearchService){}
 bookService= inject(BookService);
 bookList:Book[]=[];
 book:Book |null;
 filterdData:any;
  ngOnInit(){
    this.bookService.fetchBooks().subscribe({
      next:(res:Book[])=>{this.bookList=res;
  
        console.log('Result',res)
      },
      error:(err)=>{console.log(err)}
    
    });
    // this.searchService.search$.subscribe(term => {
    //   this.filterdData = this.filterdData.filter(item => item.toLowerCase().includes(term.toLowerCase()));
    // });
   }
}
