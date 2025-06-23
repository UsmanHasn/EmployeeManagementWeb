import { Component, model } from '@angular/core';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AttendenceService } from '../../../Services/attendence.service';
import { AdminService } from '../../../Services/admin.service';
import { LeaveRequestViewModel } from '../../../Models/LeaveRequestViewModel';
import { ApproveOrRejectLeave } from '../../../Models/ApproveOrRejectLeave';
import * as utc from 'moment'
import { ActivatedRoute } from '@angular/router';
import { stat } from 'fs';
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent {
  leaveRequests: LeaveRequestViewModel[] = []
  approveOrRejectLeave = new ApproveOrRejectLeave
  displayModal = false;
  status = 0 ;
  moment = utc

  constructor(private loaderService: LoaderService, private notify: CustomToastrService,
    private adminService: AdminService,private route:ActivatedRoute) { 
     this.route.queryParams.subscribe(param => {
      this.status = param['status'] ?? 0
     }) 
    }
  ngOnInit() {
    this.GetAllLeaveRequests();
  }
  GetAllLeaveRequests() {
    this.loaderService.show();
    this.adminService.GetAllLeaveRequests().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.leaveRequests = res.data;
        if(this.status != 0 ){
          this.leaveRequests = this.leaveRequests.filter(req => req.leaveStatusId == this.status)
        }
        if (this.status == 2) {
          debugger;
          var today = new Date();
          this.leaveRequests = this.leaveRequests.filter(req => {
              if (req.leavesFromDate && req.leavesToDate) {
                  let leavesFromDate = new Date(req.leavesFromDate);
                  let leavesToDate = new Date(req.leavesToDate);
                  return leavesFromDate <= today && leavesToDate >= today;
              } else {
                  return false; // Skip rows where leavesFromDate or leavesToDate is missing
              }
          });
      }
      
     
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
