import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/model';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { GlobalConstant } from 'src/app/shared/globalconstant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm: any = FormGroup;
  responseMessage: any;
  token:any;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstant.emailRegex)],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
        ],
      ],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    let loginInfo: Login = {
      email: formData.email,
      password: formData.password,
    };
    this.service.login(loginInfo).subscribe({
      next: (res: any) => {
        this.responseMessage = res.message;
        this.snackbar.openSuccessSnackBar(this.responseMessage, '');
        this.token = res.token;
        this.service.saveToken(this.token);
        this.router.navigate(['/books/library']);
      },
      error: (err: any) => {
        this.responseMessage = err.error.message;
        this.snackbar.openErrorSnackBar(this.responseMessage, '');
      },
    });
  };
}
