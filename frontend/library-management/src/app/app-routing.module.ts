import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { MyorderComponent } from './components/myorder/myorder.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { UsersComponent } from './components/users/users.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const routes: Routes = [
  {
    path: 'books/library',
    component: LibraryComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'users/order',
    component: MyorderComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'users/allorder',
    component: OrdersComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'books/maintanace',
    component: ManageBooksComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'books/categories',
    component: ManageCategoryComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'users/list',
    component: UsersComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'changepassword',
        component: ChangepasswordComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
