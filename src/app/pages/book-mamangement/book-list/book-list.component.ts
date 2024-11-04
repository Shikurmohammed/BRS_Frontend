import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Material } from '../../../core/material';
import { Book } from '../../../core/models/Book';
import { BookService } from '../../../core/services/book.service';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [Material,CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit{
  constructor(private searchService:SearchService){}
  //inject bookService
 bookService= inject(BookService);
 //create bookList variable
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
  this.searchService.search$.subscribe(term => {
   // this.filterdData = this.filterdData.filter(item => item.toLowerCase().includes(term.toLowerCase()));
  });

 
 }







}
