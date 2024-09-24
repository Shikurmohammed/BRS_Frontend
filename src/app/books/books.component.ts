import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDeactivateComponent } from '../guards/auth-guard.guard';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements IDeactivateComponent {
books:BookService= inject(BookService);
bookList!:Book[];
bookObject!:Book;

 bookSubscription!:Subscription;
 getBookList(){
  console.log(this.books.fetchBooks())
  this.bookSubscription=this.books.fetchBooks().subscribe((response:Book[]) => {
    console.log(response);
    this.bookList=response
  });;
 }
 ngOnInit(){
  this.getBookList()
 }
 ngOnDestroy(){
  this.bookSubscription.unsubscribe();
 }


 onSubmit( form:NgForm){
  console.log(form)
 }

 canExit() {
  console.log('You have an saved changes, do you want to leave?')
   return true;
 }

}
