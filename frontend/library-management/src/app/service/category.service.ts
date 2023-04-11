import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categories, Category } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategory(): Observable<any> {
    return this.http.get<Categories[]>(this.url + '/category/all');
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(this.url + '/category/add', category, {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    });
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put(this.url + '/category/update/' + id, category, {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.url + '/category/delete/'+id);
  }
}
