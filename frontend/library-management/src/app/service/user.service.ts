import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, Role, Signup, User, Users } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  signUp(user: Signup): Observable<object> {
    return this.http.post(this.url + '/user/signup', user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: Login): Observable<object> {
    return this.http.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstname: token.firstname,
      email: token.email,
      role: token.role === 'USER' ? Role.USER : Role.ADMIN,
      blocked: token.blocked,
      enabled: token.enabled,
    };
    return user;
  }

  getAllUser(): Observable<any> {
    return this.http.get<Users[]>(this.url + '/user/list');
  }

  enableDisableUser(userId: number): Observable<any> {
    return this.http.get(this.url + '/user/enabledisable/' + userId, {
      responseType: 'text',
    });
  }

  blockUser(userId: number): Observable<any> {
    return this.http.get(this.url + '/user/block/' + userId, {
      responseType: 'text',
    });
  }

  userInfoById(id: number): Observable<any> {
    return this.http.get<Users>(this.url + '/user/info/' + id);
  }

  updateProfile(id: number, data: any): Observable<any> {
    return this.http.put(this.url + '/user/updateprofile/' + id, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  changePassword(id: number, data: any): Observable<any> {
    return this.http.put(this.url + '/user/changepassword/' + id, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
}
