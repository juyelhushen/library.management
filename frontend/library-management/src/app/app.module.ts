import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageheaderComponent } from './components/pageheader/pageheader.component';
import { PagefooterComponent } from './components/pagefooter/pagefooter.component';
import { MaterialModule } from './shared/material-module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ConfirmationComponent } from './shared/dialog/confirmation/confirmation.component';
import { MatIconModule } from '@angular/material/icon';
import { MyorderComponent } from './components/myorder/myorder.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { CategoryComponent } from './shared/dialog/category/category.component';
import { BooksComponent } from './shared/dialog/books/books.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    PageheaderComponent,
    PagefooterComponent,
    SideNavComponent,
    LibraryComponent,
    LoginComponent,
    SignupComponent,
    ConfirmationComponent,
    MyorderComponent,
    OrdersComponent,
    UsersComponent,
    ManageCategoryComponent,
    CategoryComponent,
    BooksComponent,
    ManageBooksComponent,
    ProfileComponent,
    ChangepasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:() => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:8080']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
