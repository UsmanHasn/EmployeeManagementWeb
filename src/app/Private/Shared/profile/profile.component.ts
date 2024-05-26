import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../../../Models/UserInfo';
import { UpdateUser } from '../../../Models/UpdateUser';
import { Utils } from '../../../Helpers/Utils';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { LoaderService } from '../../../Services/loader.service';
import { AuthService } from '../../../Services/auth.service';
import { ApiResponse } from '../../../Models/ApiResponse';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  ValidateForm!: FormGroup
  currentUser = new UserInfo()
  updateUser = new UpdateUser()
  apiUrl = Utils.GetApiUrl()

  constructor(private fb: FormBuilder, private notify: CustomToastrService, private loaderService: LoaderService,
     private authService: AuthService

  ) {
    this.currentUser = authService.getLoggedInUserData()!
  }


  ngOnInit() {
    this.ValidateForm = this.fb.group({
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      email: [this.currentUser.email, Validators.required],
      phoneNumber: [this.currentUser.phoneNo, Validators.required],
      address: [this.currentUser.adress, Validators.required],

    })

  }
  UpdateUser() {
    if(this.ValidateForm.valid){
      this.loaderService.show();
      this.updateUser.firstName = this.ValidateForm.get('firstName')?.value ?? '';
      this.updateUser.lastName = this.ValidateForm.get('lastName')?.value ?? '';
      this.updateUser.phoneNo = this.ValidateForm.get('phoneNumber')?.value ?? '';
      this.updateUser.address  = this.ValidateForm.get('address')?.value ?? '';
      console.log(this.updateUser)
      this.authService.UpdateUser(this.updateUser).subscribe((res) =>{
        this.loaderService.hide();
        if(res.statusCode === 200 ){
          this.currentUser.firstName = this.updateUser.firstName
          this.currentUser.lastName = this.updateUser.lastName
          this.currentUser.phoneNo = this.updateUser.phoneNo
          this.currentUser.adress = this.updateUser.address
          localStorage.setItem("UserData",JSON.stringify(this.currentUser))
          this.notify.showSuccess(res.message)
        }
        else{
          this.notify.showError(res.message);
        }
      })
    }
  }

    
 
  onFileChange(event: any) {
    this.loaderService.show()
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Use FileReader to read the file and generate a data URL
      const reader = new FileReader();
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      reader.onload = (e: any) => {
        // Set the data URL as the source for the image
        this.currentUser.profilePic = e.target.result;

        // Call the service method to upload the image
        this.authService.UploadProfilePicture(formData).subscribe(res => {
          var apiResponse: ApiResponse = res
          this.loaderService.hide()
          if (apiResponse.statusCode === 200) {
            this.currentUser.profilePic = apiResponse.data
            this.updateUser.profilePictureUrl = apiResponse.data
            // this.u.profilePictureUrl = apiResponse.data
            this.notify.showSuccess(apiResponse.message)
          } else {
            this.notify.showError(apiResponse.message)
          }
        })
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

    
  // get firstName() { return this.ValidateForm.get('firstName') }
  // get lastName() { return this.ValidateForm.get('lastName') }
  // get email() { return this.ValidateForm.get('email') }
  // get phoneNumber() { return this.ValidateForm.get('phoneNumber') }
  // get address() { return this.ValidateForm.get('address') }

}

