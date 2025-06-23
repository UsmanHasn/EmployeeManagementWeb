import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../../../Models/UserInfo';
import { UpdateUser } from '../../../Models/UpdateUser';
import { Utils } from '../../../Helpers/Utils';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { LoaderService } from '../../../Services/loader.service';
import { AuthService } from '../../../Services/auth.service';
import { ApiResponse } from '../../../Models/ApiResponse';
import { RegisterUser } from '../../../Models/RegisterUser';
import { AdminService } from '../../../Services/admin.service';
import { UserViewModel } from '../../../Models/UserViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModel } from '../../../Models/DropdownModel';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  ValidateForm!: FormGroup
  // currentUser = new UserInfo()
  // updateUser = new UpdateUser()
  registerUser = new RegisterUser
  userViewModel = new UserViewModel
  apiUrl = Utils.GetApiUrl()
  profilePic = ''
  employeeIdentifier = ''
    departmentDropdown: DropdownModel[] = []
    designationDropdown: DropdownModel[] = []
  

  constructor(private fb: FormBuilder, private notify: CustomToastrService, private loaderService: LoaderService,
    private authService: AuthService, private adminService: AdminService,
    private router: Router, private route: ActivatedRoute,private commonService:CommonService

  ) {
    // this.currentUser = authService.getLoggedInUserData()!
    this.route.params.subscribe(param => {
      this.employeeIdentifier = param['identifier']
    })
  }


  ngOnInit() {
    this.GetDropDownForDepartment();
    this.ValidateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      departmentId:['',Validators.required]

    })

    if(this.employeeIdentifier){
      this.GetEmployeeByIdentifier(this.employeeIdentifier)
      this.ValidateForm.controls['password'].clearValidators()
      this.ValidateForm.controls['confirmPassword'].clearValidators()
    }

  }
   SaveDate(){
    debugger
    if(this.employeeIdentifier){
     this.UpdateEmployee()
    }
    else{
      this.RegisterUser()
    }
   }

  RegisterUser() {
    if (this.ValidateForm.valid) {
      this.loaderService.show();
      this.registerUser.profilePictureUrl = this.profilePic
      this.registerUser.name = this.ValidateForm.value.firstName
      this.registerUser = { ...this.registerUser, ...this.ValidateForm.value };
      console.log(this.registerUser)
      this.authService.RegisterUser(this.registerUser).subscribe((res) => {
        debugger;
        this.loaderService.hide();
        if (res.statusCode === 200) {
          this.router.navigate(['/admin/employee-list'])

          this.notify.showSuccess(res.message)
        }
        else {
          this.notify.showError(res.message);
        }
      })
    }
  }

  GetEmployeeByIdentifier(identifier: string) {
    this.loaderService.show()
    this.adminService.GetEmployeeByIdentifier(identifier).subscribe((res) => {
      this.loaderService.hide()
      if (res.statusCode === 200) {
        this.userViewModel = res.data
        this.ValidateForm.controls['firstName'].setValue(this.userViewModel.firstName)
        this.ValidateForm.controls['lastName'].setValue(this.userViewModel.lastName)
        this.ValidateForm.controls['email'].setValue(this.userViewModel.email)
        this.ValidateForm.controls['phoneNo'].setValue(this.userViewModel.phoneNo)
        this.ValidateForm.controls['address'].setValue(this.userViewModel.adress)
        this.profilePic = this.userViewModel.profilePic
      }
      else {
        this.notify.showError(res.message)
      }
    })

  }


  UpdateEmployee() {
    if (this.ValidateForm.valid) {
      this.loaderService.show();
      this.userViewModel.profilePic = this.profilePic
      this.userViewModel.firstName = this.ValidateForm.value.firstName
      this.userViewModel.lastName = this.ValidateForm.value.firstName
      this.userViewModel.phoneNo = this.ValidateForm.value.phoneNo
      this.userViewModel.adress = this.ValidateForm.value.address
      console.log(this.userViewModel)
      this.adminService.UpdateEmployee(this.userViewModel).subscribe((res) => {
        debugger;
        this.loaderService.hide();
        if (res.statusCode === 200) {
          this.router.navigate(['/admin/employee-list'])
          this.notify.showSuccess(res.message)
        }
        else {
          this.notify.showError(res.message);
        }
      })
    }
  }

  GetDropDownForDepartment() {
    this.loaderService.show();
    this.commonService.GetDropDownForDepartment().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.departmentDropdown = res.data
      }
      else {
        this.notify.showError(res.message)

      }
    })
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
        this.profilePic = e.target.result;

        // Call the service method to upload the image
        this.authService.UploadProfilePicture(formData).subscribe(res => {
          var apiResponse: ApiResponse = res
          this.loaderService.hide()
          if (apiResponse.statusCode === 200) {
            this.profilePic = apiResponse.data
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

}
