import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Books, CategoryBooks } from 'src/app/model/model';
import { BookService } from 'src/app/service/book.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { BooksComponent } from 'src/app/shared/dialog/books/books.component';
import { ConfirmationComponent } from 'src/app/shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss'],
})
export class ManageBooksComponent {
  availableBooks: Books[] = [];
  booksToDisplay: CategoryBooks[] = [];
  responseMessage: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'action',
  ];

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllBooks();
  }

  handleAddBook() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(BooksComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddBook.subscribe((res) => {
      this.getAllBooks();
    });
  }

  handleEditBook(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(BooksComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditBook.subscribe((res) => {
      this.getAllBooks();
    });
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (res: Books[]) => {
        this.availableBooks = [];
        console.log(res);
        for (var book of res) this.availableBooks.push(book);
        console.log(this.availableBooks);

        this.updateList();
      },
      error: (err: any) => {
        if (err.error.message) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = err.error.message;
        }
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  }

  getCountOfBooks() {
    return this.booksToDisplay.reduce((pv, cv) => cv.books.length + pv, 0);
  }

  deleteCategory(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete.',
      confirmation: true,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onEventStatusChange.subscribe(
      (res: any) => {
        dialogRef.close();
        this.bookService.deleteBook(id).subscribe({
          next: (res: any) => {
          // this.booksToDisplay = this.booksToDisplay.filter((s)=>{
          //   return Books.id != s.books.id;
          // })
          this.getAllBooks();
            this.responseMessage = res.message;
            this.snackbar.openSuccessSnackBar(this.responseMessage, '');
          },
          error: (err: any) => {
            this.responseMessage = err.error.message;
            this.snackbar.openErrorSnackBar(this.responseMessage, '');
          },
        });
      }
    );
  }

  updateList() {
    this.booksToDisplay = [];
    for (let book of this.availableBooks) {
      let exist = false;
      for (let categoryBooks of this.booksToDisplay) {
        if (
          book.categoryName === categoryBooks.categoryName &&
          book.subcategory === categoryBooks.subcategory
        )
          exist = true;
      }

      if (exist) {
        for (let categoryBooks of this.booksToDisplay) {
          if (
            book.categoryName === categoryBooks.categoryName &&
            book.subcategory === categoryBooks.subcategory
          )
            categoryBooks.books.push(book);
        }
      } else {
        this.booksToDisplay.push({
          categoryName: book.categoryName,
          subcategory: book.subcategory,
          books: [book],
        });
      }
    }
  }
}
