import { Component } from '@angular/core';
import { Users } from 'src/app/model/model';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  users: any;
  responseMessage: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'mobilenumber',
    'fine',
    'blocked',
    'active',
    'createdOn',
    'action',
  ];

  constructor(
    private userService: UserService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getAllUser().subscribe({
      next: (res: Users[]) => {
        this.users = [];
        this.users = res;
      },
      error: (err: any) => {
        this.responseMessage = err.error;
        this.snackbar.openSuccessSnackBar(this.responseMessage, '');
      },
    });
  }

  enabledisableUser(user: Users) {
    this.userService.enableDisableUser(user.id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          user.enabled = false;
          this.snackbar.openSuccessSnackBar(
            'User Acount is Disabled successfully.',
            ''
          );
        } else {
          this.responseMessage = res;
          user.enabled = true;
          this.snackbar.openSuccessSnackBar(this.responseMessage, '');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.responseMessage = err.error;
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  }

  blockUser(user: Users) {
    this.userService.blockUser(user.id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          user.locked = false;
          this.snackbar.openSuccessSnackBar('User account has blocked.', '');
        } else {
          this.responseMessage = res;
          user.locked = true;
          this.snackbar.openSuccessSnackBar(res, '');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.responseMessage = err.error;
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  }
}
