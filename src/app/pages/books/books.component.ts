import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, } from '@angular/forms';


import { Modal } from 'bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Material } from '../../core/material';
import { IDeactivateComponent } from './../../core/guards/auth.guard';
import { Book } from './../../core/models/Book';
import { BookService } from './../../core/services/book.service';
declare var $: any; // Declare jQuery
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
   
  CommonModule, FormsModule,ReactiveFormsModule,Material
],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers:[],
  encapsulation:ViewEncapsulation.Emulated
})
export class BooksComponent implements IDeactivateComponent, AfterViewInit {
private toast= inject(ToastrService);

  bookService: BookService = inject(BookService);
  bookList: Book[];
  selectedFile:File|null =null;
  selectedBook: Book;
  selectedDate:Date|null=null;
  selectedTime:string='';
  bookObject: Book = new Book();
  isFormSubmitted: boolean = false;
  isEditMode= false;
  bookSubscription!: Subscription;
  //@ViewChild('searchKey')searchKey:ElementRef
  searchKey:string;
  @ViewChild('bookFormRef') bookForm!: NgForm;
  @ViewChild('createOrUpdateBookModal', { static: true })bookModal!: ElementRef;
  noContent: string = '';
  currentBookId!: number;
  private modalInstance: any;
	//model: NgbDateStruct;
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  readonly campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  formData = new FormData();
  onSubmit(form: NgForm) {
    this.isFormSubmitted = true;
    this.bookObject = form.value;
    
  }
  onFileSelected(event:Event){
    const inputFile= event.target as HTMLInputElement;
    if(inputFile.files && inputFile.files.length>0){
      this.selectedFile= inputFile.files[0];
    }

  }
  createOrUpdateBook() {
// append image to book object
const formData= new FormData();
formData.append('book', JSON.stringify(this.bookObject));
formData.append('image', this.selectedFile);

    if (this.isEditMode) {
      this.bookService
        .updateBook(this.bookObject, this.currentBookId)
        .subscribe({
            next:(res)=>{ 
               console.log(res);
               this.getBookList();},
            error:(err)=>console.log(err)
        });
    } else {
      this.bookService.addBook(formData).subscribe({
        next: (res) => {
          console.log(res), this.getBookList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  editBook(id: number | undefined) {
    this.toast.info("Edited")
    this.isEditMode = true;
    this.openModal();

    this.selectedBook = this.bookList.find((book) => {
      return book.id === id;
    });
    this.bookForm.form.patchValue(this.selectedBook);
    this.currentBookId = id;  }

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.bookModal.nativeElement, {
      backdrop: false,
    });
    
    $('#dateTimepicker').datetimepicker({
      format: 'YYYY-MM-DD HH:mm', // Format for the date-time
      icons: {
        time: 'far fa-clock', // Icons for the date-time picker
        date: 'far fa-calendar-alt',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-check',
        clear: 'fas fa-trash',
        close: 'fas fa-times'
      }
    })
    .on('dp.change', (e: any) => {
      this.selectedDateTime = e.date.format('YYYY-MM-DD HH:mm'); // Update the selected date-time
    });
  }

  getBookList() {
    this.bookSubscription = this.bookService.fetchBooks().subscribe({
      next: (res: HttpResponse<Book[]>) => {
        this.bookList = res.body;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.noContent=err
      },
    });
  }

  deleteBook(id: number) {
    //confirm('are you sure?');
    this.bookService.removeBook(id).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) console.log(event);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


/*get :- keyword creates getter method for a property, 
  and it enables us create a special methods to access properties
*/
  get filteredResults() {
    let key='';
    if(this.searchKey)
   {  key=this.searchKey?.toLowerCase();
    return this.bookList?.filter(book =>
      book.title?.toLowerCase().includes(key) ||
      book.author?.toLowerCase().includes(key)||
      book.author?.toLowerCase().includes(key) ||
      book.iSBN?.toLowerCase().includes(key) ||
      book.type?.toLowerCase().includes(key) ||
      book.publicationDate?.toLocaleLowerCase().includes(key) ||
      book.registrationDate?.toLocaleLowerCase().includes(key) ||
      book.id.toString().includes(key)
    );}
    else{
      return this.bookList;
    }

  }
  selectedDateTime: string = ''; 
  ngOnInit() {
    this.getBookList();
    this.bookSubscription = this.bookService.errorSubject.subscribe(
      (httpError) => {
        console.log(httpError);
      },
    );




  
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

  openModal() {
    this.modalInstance.show();
  }
  closeModal() {
    this.bookForm.form.reset();
    this.isEditMode = false;
    this.modalInstance.hide();
  }

//FormGroup Controll

readonly range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl< Date | null>(null),
});
weekDayFilter=(d:Date|null):boolean=>{
  const day=(d || new Date()).getDay();
  return (day!==0 && day!==4);
}
  
}
