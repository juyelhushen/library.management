import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BooksRequest, Order, OrderRequest } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get(this.url + '/books/all');
  }

  orderBook(data: OrderRequest): Observable<any> {
    return this.http.post(this.url + '/order/add', data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
      responseType: 'text',
    });
  }

  orderList(userId: number): Observable<any> {
    return this.http.get(this.url + '/order/list/' + userId);
  }

  allOrderList(): Observable<any> {
    return this.http.get(this.url + '/order/list');
  }

  returnBook(data: any): Observable<any> {
    return this.http.post(this.url + '/order/return', data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
      responseType: 'text',
    });
  }

  saveBook(books: BooksRequest): Observable<any> {
    return this.http.post(this.url + '/books/add', books, {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    });
  }

  updateBook(id:number,books: BooksRequest): Observable<any> {
    return this.http.put(this.url + '/books/update/'+id, books, {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.url + '/books/delete/' + id);
  }
}
