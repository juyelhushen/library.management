import { Component } from '@angular/core';
import { Order } from 'src/app/model/model';
import { BookService } from 'src/app/service/book.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { GlobalConstant } from 'src/app/shared/globalconstant';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss'],
})
export class MyorderComponent {
  listOfOrder: Order[] = [];
  responseMessage: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'bookid',
    'book',
    'date',
    'returned',
    'action',
  ];

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.orderListById();
  }

  orderListById() {
    let userId: number = this.userService.getTokenUserInfo()?.id ?? 0;

    this.bookService.orderList(userId).subscribe({
      next: (res: Order[]) => {
        this.listOfOrder = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  returnBook(order:Order) {

    let returnInfo = {
      bookId: order.bookId,
      userId: this.userService.getTokenUserInfo()?.id ?? 0,
    };

    this.bookService.returnBook(returnInfo).subscribe({
      next: (res: any) => {
        order.returned = true;
        this.responseMessage = res;
        this.snackbar.openSuccessSnackBar(this.responseMessage, '');
      },
      error: (err: any) => {
        if (err.error) {
          this.responseMessage = err.error;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbar.openErrorSnackBar(
          this.responseMessage,
          GlobalConstant.error
        );
      },
    });
  }
}
