import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  isChildVisible = true;

  userInfo:any;
  userForm: any = FormGroup;
  columns: string[] = ['name', 'value'];
  responseMessage: any;

  constructor(
    private router:Router,
    private userService: UserService,
    private snackbar: SnackbarService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getUserInfoById();

    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required]],
    });
  }

  onActivate() {
    this.isChildVisible = false;
  }
  
  onDeactivate() {
    this.isChildVisible = true;
  }

  getUserInfoById() {
    let userId: number = this.userService.getTokenUserInfo()?.id ?? 0;
    this.userService.userInfoById(userId).subscribe({
      next: (res: any) => {
        this.userInfo = res;
        this.userForm = this.fb.group({
          firstname: [this.userInfo.firstName, Validators.required],
          lastname: [this.userInfo.lastName, Validators.required],
          email: [this.userInfo.email, Validators.required],
          mobilenumber: [this.userInfo.mobileNumber, Validators.required],
        });
      },
      error: (err: any) => {
        this.responseMessage = err.error;
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  }

  updateProfile() {
    let userId: number = this.userService.getTokenUserInfo()?.id ?? 0;
    const formData = this.userForm.value;
    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email:formData.email,
      mobilenumber:formData.mobilenumber
    };

    this.userService.updateProfile(userId,data).subscribe({
      next:(res:any)=> {
        this.responseMessage = res.message;
        this.snackbar.openSuccessSnackBar(this.responseMessage,'');
      },
      error:(err:any) => {
        this.responseMessage = err.error;
        this.snackbar.openErrorSnackBar(this.responseMessage,'');
      }
    });
  };


}
