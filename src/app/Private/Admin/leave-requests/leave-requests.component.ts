import { Component } from '@angular/core';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AttendenceService } from '../../../Services/attendence.service';
import { AdminService } from '../../../Services/admin.service';
import { LeaveRequestViewModel } from '../../../Models/LeaveRequestViewModel';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent {
leaveRequests: LeaveRequestViewModel[] = []
  constructor(private loaderService: LoaderService, private notify: CustomToastrService,
     private adminService: AdminService) { }
  ngOnInit(){
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


}
