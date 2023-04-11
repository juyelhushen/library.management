import { Component } from '@angular/core';
import { Order } from 'src/app/model/model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  listOfOrders: Order[] = [];
  orderToDisplay:Order[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'bookid',
    'book',
    'date',
    'returned',
  ];

  constructor(
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.allOrderList();
    }

  allOrderList() {
    this.bookService.allOrderList().subscribe({
      next: (res: Order[]) => {
        this.listOfOrders = res;
        this.orderToDisplay = this.listOfOrders;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filter(value: string) {
    if (value === 'all') {
      this.orderToDisplay = this.listOfOrders.filter((value) => value);
    } else if (value === 'pen') {
      this.orderToDisplay = this.listOfOrders.filter(
        (value) => value.returned == false
      );
    } else {
      this.orderToDisplay = this.listOfOrders.filter(
        (value) => value.returned
      );
    }
  }

}
