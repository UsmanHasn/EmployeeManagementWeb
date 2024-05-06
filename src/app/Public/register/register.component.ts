import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../Models/RegisterUser';
import { AuthService } from '../../Services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  validateForm!: FormGroup
  registerModel = new RegisterUser
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phoneno: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  OnSubmit() {
    console.log(this.validateForm)
    if (this.validateForm.valid) {
      this.registerModel.name = this.validateForm.value.name
      this.registerModel.email = this.validateForm.value.email
      this.registerModel.address = this.validateForm.value.address
      this.registerModel.phoneNo = this.validateForm.value.phoneno
      this.registerModel.password = this.validateForm.value.password
      this.registerModel.confirmPassword = this.validateForm.value.confirmPassword
      this.registerModel.dob = new Date
      console.log(this.registerModel)
      this.authService.RegisterUser(this.registerModel).subscribe(response => {
        if (response.statusCode === 200) {
          console.log(response.data)
        }
        else {
          console.log(response.message)

        }
      })
    }
  }
}
