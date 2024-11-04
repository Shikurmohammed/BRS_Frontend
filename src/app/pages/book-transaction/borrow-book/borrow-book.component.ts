import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Material } from '../../../core/material';
import { Book } from '../../../core/models/Book';
import { BookService } from '../../../core/services/book.service';
import { BookDetailsComponent } from '../../book-mamangement/book-details/book-details.component';
import { MakeRequestComponent } from '../make-request/make-request.component';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [Material],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent {
  constructor(private dialog:MatDialog){}
//displayedColumns
displayedColumns=['Title','Author','PublicationDate','Type','NumberOfCopies','Edition',
  'Status','Actions']

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

 } 
 onRowClicked(row){
  console.log(row)
   }
 
  viewDetails(book:Book){
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      data: book,
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
    });
  }
  onBorrowRequest(book:Book){
    const dialogRef = this.dialog.open(MakeRequestComponent, {
      data: book,
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
    });
  }

}
