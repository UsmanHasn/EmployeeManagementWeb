import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddLeave } from '../../../Models/AddLeave';
import { DropdownModel } from '../../../Models/DropdownModel';
import { LeaveService } from '../../../Services/leave.service';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';


@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {
  addLeave = new AddLeave
  dropdown: DropdownModel[] = []
  validateForm!: FormGroup
  constructor(private fb: FormBuilder, private leaveService: LeaveService, private loaderService: LoaderService,
     private notify: CustomToastrService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      leaveTypeId: ['', Validators.required],
      reason: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    })
    this.GetLeaveRequestTypes();
  }

  GetLeaveRequestTypes() {
    this.loaderService.show();
    this.leaveService.GetLeaveRequestTypes().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.dropdown = res.data
      }
      else {
        this.notify.showError(res.message)

      }
    })
  }

  SubmitForm() {
    if (this.validateForm.valid) {
      this.loaderService.show();
      this.addLeave.leaveTypeId = this.validateForm.value.leaveTypeId;
      this.addLeave.reasons = this.validateForm.value.reason;
      console.log(this.addLeave)
      this.leaveService.AddLeave(this.addLeave).subscribe(res => {

        this.loaderService.hide();
        if (res.statusCode === 200) {
          this.notify.showSuccess(res.message)

        }
        else {
          this.notify.showError(res.message)
        }
      })
    }
  }

}
