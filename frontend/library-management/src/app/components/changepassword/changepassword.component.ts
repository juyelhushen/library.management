import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GlobalConstant } from 'src/app/shared/globalconstant';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})

export class ChangepasswordComponent {

  passwordForm:any = FormGroup;
  responseMessage:any;

  constructor(private location: Location,
    private userService:UserService,
    private fb:FormBuilder,
    private snackbar:SnackbarService) {}

    ngOnInit():void {
      this.passwordForm = this.fb.group({
        currentpassword:[null,[Validators.required,Validators.minLength(6)]],
        newpassword:[null,[Validators.required,Validators.minLength(6)]],
        confirmpassword:[null,[Validators.required,Validators.minLength(6)]]
      });
    };

  changePassword() {
    const formData = this.passwordForm.value;
    const userId: number = this.userService.getTokenUserInfo()?.id ?? 0;
    const data = {
      currentPassword:formData.currentpassword,
      newPassword: formData.newpassword
    }

    this.userService.changePassword(userId,data).subscribe({
      next:(res:any)=>{
        this.responseMessage = res.message;
        this.snackbar.openSuccessSnackBar(this.responseMessage,'');
      },
      error:(err:any)=>{
        this.responseMessage = err.error.message;
        this.snackbar.openErrorSnackBar(this.responseMessage,'');
      }
    })
  }
 
  goBack() {
    this.location.back();
  }
}
