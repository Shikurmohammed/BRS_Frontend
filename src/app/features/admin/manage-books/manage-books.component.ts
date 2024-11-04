import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IDeactivateComponent } from '../../../core/guards/auth.guard';
import { Material } from '../../../core/material';
import { Book } from '../../../core/models/Book';
import { BookService } from '../../../core/services/book.service';
import { BookDetailsComponent } from '../../../pages/book-mamangement/book-details/book-details.component';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Material],
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.css',
})
export class ManageBooksComponent
  implements IDeactivateComponent, AfterViewInit
{
  constructor(private dialog:MatDialog){}
  private toast = inject(ToastrService);

  bookService: BookService = inject(BookService);
  bookList: Book[];
  selectedFile: File | null = null;
  selectedBook: Book;
  selectedDate: Date | null = null;
  selectedTime: string = '';
  bookObject: Book = new Book();
  isFormSubmitted: boolean = false;
  isEditMode = false;
  bookSubscription!: Subscription;

  searchKey: string;
  @ViewChild('bookFormRef') bookForm!: NgForm;
  @ViewChild('createOrUpdateBookModal', { static: true }) bookModal!: ElementRef;
  noContent: string = '';
  currentBookId!: number;
  private modalInstance: any;
  @ViewChild("picker") publishedAt;



  formData = new FormData();
  onSubmit(form: NgForm) {
    this.isFormSubmitted = true;
    this.bookObject = form.value;
  }
  onFileSelected(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      this.selectedFile = inputFile.files[0];
    }
  }
  createOrUpdateBook() {
    // append image to book object
    const formData = new FormData();
    formData.append('book', JSON.stringify(this.bookObject));
    formData.append('image', this.selectedFile);
   console.log(this.bookForm)
   console.log("Form Data")
    if (this.isEditMode) {
      this.bookService
        .updateBook(this.bookObject, this.currentBookId)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.getBookList();
            this.toast.info('Edited');
          },
          error: (err) => console.log(err),
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
  
    this.isEditMode = true;
    this.openModal();

    this.selectedBook = this.bookList.find((book) => {
      return book.id === id;
    });
    this.bookForm.form.patchValue(this.selectedBook);
    this.currentBookId = id;
    console.log("SELECTED")
    console.log(this.selectedBook)
    this.bookObject=this.selectedBook;
  }

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.bookModal.nativeElement, {
      backdrop: false,
    });
  }
  getBookList() {
    this.bookSubscription = this.bookService.fetchBooks().subscribe({
      next: (res: Book[]) => {
        this.bookList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.noContent = err;
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
    let key = '';
    if (this.searchKey) {
      key = this.searchKey?.toLowerCase();
      return this.bookList?.filter(
        (book) =>
          book.title?.toLowerCase().includes(key) ||
          book.author?.toLowerCase().includes(key) ||
          book.author?.toLowerCase().includes(key) ||
          book.isbn?.toLowerCase().includes(key) ||
          book.type?.toLowerCase().includes(key) ||
         // book.publicationDate?.toLocaleLowerCase().includes(key) ||
          book.created_at?.toLocaleLowerCase().includes(key) ||
          book.id.toString().includes(key),
      );
    } else {
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
        this.bookObject.isbn ||
        this.bookObject.total_copies ||
        this.bookObject.title ||
        this.bookObject.type ||
        this.bookObject.author ||
        this.bookObject.publication_date ||
        this.bookObject.created_at)
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
    end: new FormControl<Date | null>(null),
  });
  weekDayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 4;
  };

  viewDetails(record: any) {
    console.log(record)
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      data: record,
      width:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
