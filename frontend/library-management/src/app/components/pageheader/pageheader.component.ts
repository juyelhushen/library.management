import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { ConfirmationComponent } from 'src/app/shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss'],
})
export class PageheaderComponent {
  @Output() menuClicked = new EventEmitter<boolean>();

  constructor(public service: UserService,
    private snackbar:SnackbarService,
    private router:Router,
    private dialog:MatDialog) {}

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "Logout",
      confirmation: true
    }

    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEventStatusChange.subscribe((res:any)=> {
      dialogRef.close();
      this.service.deleteToken();
      this.router.navigate(['/login']);
    })

  }
}
