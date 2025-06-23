import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { Router } from '@angular/router';
import { UserViewModel } from '../../../Models/UserViewModel';


@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrl: './add-departments.component.css'
})
export class AddDepartmentsComponent {

  adddepartment = new UserViewModel
  validateForm!: FormGroup

  constructor(private fb: FormBuilder, private adminService: AdminService, private LoaderService: LoaderService,
    private notify: CustomToastrService, private router:Router) {

  }

  ngOnInit(){
     this.validateForm = this.fb.group({
      Name: ['', Validators.required],
      createdOn: ['', Validators.required],
      isActive: [true],
    })
  }

    SubmitForm() {
      debugger
    if (this.validateForm.valid) {
      console.log(this.validateForm)
    
      this.LoaderService.show();
      this.adddepartment.firstName = this.validateForm.value.Name;
      this.adddepartment.createdOn = this.validateForm.value.createdOn;
      this.adddepartment.isActive = this.validateForm.value.isActive;
      console.log(this.adddepartment)
      this.adminService.Adddepartment(this.adddepartment).subscribe(res => {

        this.LoaderService.hide();
        if (res.statusCode === 200) {
          this.notify.showSuccess(res.message)
        //  this.router.navigate(['/staff/my-leave-requests'])
        
        }
        else {
          this.notify.showError(res.message)
        }
      })
    }
  }
}
