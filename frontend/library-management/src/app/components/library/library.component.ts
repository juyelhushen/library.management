import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Books, CategoryBooks, OrderRequest, Role } from 'src/app/model/model';
import { BookService } from 'src/app/service/book.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent {
  availableBooks: Books[] = [];
  booksToDisplay: CategoryBooks[] = [];
  responseMessage: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialog:MatDialog
  ) {}

  ngOnInit() {
    this.getAllBooks();
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
    return this.booksToDisplay.reduce((pv,cv)=>cv.books.length + pv,0);
  }

  search(value:string) {
    value = value.toLowerCase();
    this.updateList();
    if (value.length > 0) {
      this.booksToDisplay = this.booksToDisplay.filter((categoryBooks) => {
        categoryBooks.books = categoryBooks.books.filter(
          (book) =>
          book.title.toLowerCase().includes(value) ||
          book.author.toLowerCase().includes(value)
        )
        return categoryBooks.books.length > 0;
      })
    }
  };

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

  orderBook(book:Books) {

    let orderData:OrderRequest = {
      userId: this.userService.getTokenUserInfo()?.id ?? 0,
      bookId: book.id
    }
    this.bookService.orderBook(orderData).subscribe({
      next:(res:any)=> {
        if (res === "success") {
          book.available = false;
          console.log("Hello"+book.available+"hello");

          this.snackbar.openSuccessSnackBar("Your Order is completed.",'');
        }
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  isBlocked():boolean {
    let blocked = this.userService.getTokenUserInfo()?.blocked;
    console.log(blocked);

    if (blocked) {
      return false;
    } else {
      return true
    }
  }

  isAdmin() {
    let admin = this.userService.getTokenUserInfo()?.role;
    if (admin === Role.ADMIN) {
      return false;
    } else {
      return true;
    }
  };



}
