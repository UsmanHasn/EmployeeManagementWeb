import { Component } from '@angular/core';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { LeaveService } from '../../../Services/leave.service';
import { LeaveRequestViewModel } from '../../../Models/LeaveRequestViewModel';

@Component({
  selector: 'app-my-leave-requests',
  templateUrl: './my-leave-requests.component.html',
  styleUrl: './my-leave-requests.component.css'
})
export class MyLeaveRequestsComponent {

  myleaveRequests: LeaveRequestViewModel[] = []
  constructor(private loaderService: LoaderService, private notify: CustomToastrService,
     private leaveService: LeaveService) { }
  ngOnInit(){
    this.GetAllLeaveRequests();
  }
  GetAllLeaveRequests() {
    this.loaderService.show();
    this.leaveService.GetAllMyLeaveRequests().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.myleaveRequests = res.data;

      }
      else {
        this.notify.showError(res.message);

      }
    })
  }

}
