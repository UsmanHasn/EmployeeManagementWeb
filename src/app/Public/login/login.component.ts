import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../Models/LoginRequest';
import { AuthService } from '../../Services/auth.service';
import { response } from 'express';
import { CustomToastrService } from '../../Services/customToastr.service';
import { LoaderService } from '../../Services/loader.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../Models/UserInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  validateForm!: FormGroup
  loginModel = new LoginRequest
  currentUser = new UserInfo
  constructor(private fb: FormBuilder, private authService: AuthService, private notify: CustomToastrService,
    private loaderService: LoaderService, private router: Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.validateForm)
    if (this.validateForm.valid) {
      this.loaderService.show()
      this.loginModel.email = this.validateForm.value.email
      this.loginModel.password = this.validateForm.value.password
      console.log(this.loginModel)
      this.authService.LoginUser(this.loginModel).subscribe(response => {
        this.loaderService.hide()
        if (response.statusCode === 200) {
          this.currentUser = response.data
          console.log(this.currentUser)
          localStorage.setItem('UserData', JSON.stringify(this.currentUser))
          this.validateForm.reset()
          this.loginModel = new LoginRequest
          if (this.currentUser.userTypeId === 1) {
            this.router.navigate(['admin/dashboard'])

          }
          else {
            this.router.navigate(['staff/dashboard'])

          }
          this.notify.showSuccess(response.message)
        }
        else if (response.statusCode === 400) {
          this.notify.showWarning(response.message)

        }
        else {
          console.log(response.message)
          this.notify.showError(response.message)

        }

      })

    }
  }

}
