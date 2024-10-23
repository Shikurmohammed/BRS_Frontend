import { HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Material } from '../../../core/material';
import { Book } from '../../../core/models/Book';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [Material],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit{
  //inject bookService
 bookService= inject(BookService);
 //create bookList variable
 bookList:Book[]=[];
 book:Book;

//displayedColumns
displayedColumns=['Title','Author','PublicationDate','Type','NumberOfCopies','Edition',
  'Status','Actions']

 ngOnInit(){
  this.bookService.fetchBooks().subscribe({
    next:(res:HttpResponse<Book[]>)=>{this.bookList=res.body;

      console.log('Result',res.body)
    },
    error:(err)=>{console.log(err)}
  
  })
 }




 onRowClicked(row){
console.log(row)
 }



}
