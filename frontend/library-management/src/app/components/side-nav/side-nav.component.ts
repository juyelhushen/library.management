import { Component } from '@angular/core';
import { SideNavItems } from 'src/app/model/model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  sideNavContent:SideNavItems[] = [
    {
      title: 'view books',
      link: 'books/library'
    },
    {
      title: 'manage books',
      link: 'books/maintanace'

    },
    {
      title: 'manage categories',
      link: 'books/categories'
    },
    {
      title: 'view users',
      link: 'users/list'
    },
    {
      title: 'all orders',
      link: 'users/allorder'
    },
    {
      title: 'My orders',
      link: 'users/order'
    },

  ]

}
