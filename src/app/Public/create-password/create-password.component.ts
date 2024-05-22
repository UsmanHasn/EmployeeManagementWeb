import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../Services/loader.service';
import { CustomToastrService } from '../../Services/customToastr.service';
import { AuthService } from '../../Services/auth.service';
import { ResetUserPassword } from '../../Models/ResetUserPassword';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {
  ValidateForm!: FormGroup
  resetuserpasword = new ResetUserPassword()

  constructor(private fb: FormBuilder, private loaderService: LoaderService, private notify: CustomToastrService, private authService:AuthService,) {

  }

  ngOnInit() {
    this.ValidateForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  Submit(){
    if(this.ValidateForm.valid){
    this.loaderService.show();
    this.resetuserpasword = this.ValidateForm.value
    this.authService.ResetUserPassword(this.resetuserpasword).subscribe((res) => {
      this.loaderService.hide();
      if(res.statusCode === 200){
        this.notify.showSuccess(res.message)
      }
      else{
        this.notify.showError(res.message)
      }
    })
    }
  }
}
