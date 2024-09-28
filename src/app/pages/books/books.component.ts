import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDeactivateComponent } from '../../guards/auth.guard';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements IDeactivateComponent {
  bookService: BookService = inject(BookService);
  bookList!: Book[];
  bookObject: Book = new Book();
  isFormSubmitted: boolean = false;
  bookSubscription!: Subscription;
  searchKey!:number;

  isEditMode=false;
  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.isFormSubmitted = true;
    this.bookObject=form.value;
    this.createBook(this.bookObject)
  }
  createOrUpdateBook(){
    
    

  }
  createBook(data:Book){
    console.log(data)
this.bookService.addBook(data).subscribe((response) => {
      console.log(response);
    });
  }
  updateBook(data:Book, id:number){
    this.isEditMode=true;
  }
  getBookList() {
    this.bookSubscription = this.bookService
      .fetchBooks()
      .subscribe({next:(res:Book[])=>{this.bookList=res}, error:(err)=>{console.log(err)}});
  }
  
  deleteBook(id: number) {
    this.bookService.removeBook(id).subscribe({
      next: (response) => {
        console.log('success' + response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchBookById(id: number) {
    this.bookService.searchBook(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getBookList();
    }, 3000);
  }
  ngOnDestroy() {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }
  canExit() {
    if (
      !this.isFormSubmitted &&
      (this.bookObject.author ||
        this.bookObject.title ||
        this.bookObject.iSBN ||
        this.bookObject.numberOfCopies ||
        this.bookObject.title ||
        this.bookObject.type ||
        this.bookObject.author ||
        this.bookObject.publicationDate ||
        this.bookObject.registrationDate)
    ) {
      return confirm('You have an saved changes, do you want to leave?');
    } else {
      return true;
    }
  }
}
