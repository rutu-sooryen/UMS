import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersWithRole } from 'src/app/models/users.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  userNameErrorMessage = '';
  passwordErrorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  verifyUser(userRoleArry: any, findkey: string, findvalue: string): any {
    for (let user of userRoleArry) {
      for (let key in user) {
        if (key === findkey && user[key] === findvalue) {
          return user;
        }
      }
    }
  }

  verifyLogin() {
    this.dashboardService
      .getUserRoles()
      .subscribe((result: UsersWithRole[]) => {
        let isusername = this.verifyUser(
          result,
          'username',
          this.loginForm.get('userName')?.value
        );
        if (isusername) {
          let isLoginObj = this.verifyUser(
            result,
            'password',
            this.loginForm.get('password')?.value
          );
          if (isLoginObj) {
            const isAdmin = isLoginObj.role === 'admin' ? true : false;

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', isLoginObj.username);
            localStorage.setItem('isAdmin', isAdmin.toString());

            this.router.navigate(['/dashboard']);
          } else {
            this.userNameErrorMessage = '';
            this.loginForm.get('password')?.setErrors({ invalid: true });
            this.passwordErrorMessage = 'Password is Invalid';
          }
        } else {
          this.passwordErrorMessage = '';
          this.loginForm.get('userName')?.setErrors({ invalid: true });
          this.userNameErrorMessage = 'username is Invalid';
        }
      }),
      () => {
        this.userNameErrorMessage = '';
        this.passwordErrorMessage = '';
      };
  }
}
