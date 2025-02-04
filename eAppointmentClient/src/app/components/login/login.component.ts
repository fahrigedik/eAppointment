import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { FormValidateDirective } from 'form-validate-angular';
import { HttpService } from '../../services/http.service';
import { ResultModel } from '../../models/result.model';
import { LoginResponseModel } from '../../models/login-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FormValidateDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private httpService: HttpService, private router: Router) {}

  @ViewChild('password') password: ElementRef<HTMLInputElement> | undefined;

  loginModel: LoginModel = new LoginModel();
  showOrHidePassword() {
    if (this.password === undefined) {
      return;
    }

    if (this.password.nativeElement.type === 'password') {
      this.password.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
    }
  }

  signIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.httpService.post<LoginResponseModel>(
      'Auth/Login',
      this.loginModel,
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.data!.token);
        this.router.navigate(['/']);
      }
    );

    console.log(this.loginModel);
  }
}
