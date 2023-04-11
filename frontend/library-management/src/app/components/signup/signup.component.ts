import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup, User } from 'src/app/model/model';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { GlobalConstant } from 'src/app/shared/globalconstant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  password = true;
  cpassword = true;

  signupForm:any = FormGroup;
  submitted = false;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private snackbar:SnackbarService,
    private service:UserService,
    private router:Router) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname:[null,[Validators.required,Validators.maxLength(15),Validators.pattern(GlobalConstant.nameRegex)]],
      lastname:[null,[Validators.required,Validators.maxLength(15),Validators.pattern(GlobalConstant.nameRegex)]],
      // dateofbirth:[null,[Validators.required,Validators.pattern(GlobalConstant.dataRegex)]],
      mobilenumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
      email:[null,[Validators.required,Validators.email,Validators.pattern(GlobalConstant.emailRegex)]],
      password:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(13)]],
      confirmPassword: [null,[Validators.required]]
    });
  };

  validateSubmit() {
    if (this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value) {
      return true;
    } else {
      return false;
    }
  };

  onSubmit() {

    const formData = this.signupForm.value;
    let signupInfo :Signup = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      // dateofbirth: formData.dateofbirth,
      email: formData.email,
      mobilenumber: formData.mobilenumber,
      password: formData.password,
    };
    this.service.signUp(signupInfo).subscribe({
      next:(res:any) => {
        this.responseMessage = res.message;
        console.log(this.responseMessage);

        this.snackbar.openSuccessSnackBar(this.responseMessage,'');
        this.router.navigate(['/login']);
      },
      error: (err:any) => {
        console.log(err);
        this.responseMessage = err.error.message;
        this.snackbar.openErrorSnackBar(this.responseMessage,'');
      }
    })

  }



}
