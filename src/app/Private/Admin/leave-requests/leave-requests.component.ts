import { Component, model } from '@angular/core';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AttendenceService } from '../../../Services/attendence.service';
import { AdminService } from '../../../Services/admin.service';
import { LeaveRequestViewModel } from '../../../Models/LeaveRequestViewModel';
import { ApproveOrRejectLeave } from '../../../Models/ApproveOrRejectLeave';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent {
  leaveRequests: LeaveRequestViewModel[] = []
  approveOrRejectLeave = new ApproveOrRejectLeave
  displayModal = false;
  constructor(private loaderService: LoaderService, private notify: CustomToastrService,
    private adminService: AdminService) { }
  ngOnInit() {
    this.GetAllLeaveRequests();
  }
  GetAllLeaveRequests() {
    this.loaderService.show();
    this.adminService.GetAllLeaveRequests().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.leaveRequests = res.data;

      }
      else {
        this.notify.showError(res.message);

      }
    })
  }

  ApproveOrRejectLeave() {
    this.loaderService.show();
    this.adminService.ApproveOrRejectLeave(this.approveOrRejectLeave).subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.leaveRequests.forEach(obj => {
          if (obj.identifier === this.approveOrRejectLeave.identifier) {
            obj.leaveStatusId = this.approveOrRejectLeave.statusId
            obj.leaveStatus = this.approveOrRejectLeave.statusId === 2 ? 'Approved' : 'Rejected'

          }
        })
        this.displayModal = false
        this.notify.showSuccess(res.message);

      }
      else {
        this.notify.showError(res.message)
      }
    })

  }

  OpenModal(identifier: string, statusId: number) {
    this.displayModal = true
    this.approveOrRejectLeave.identifier = identifier
    this.approveOrRejectLeave.statusId = statusId
  }




}
