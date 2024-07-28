import { Component } from '@angular/core';
import { LeaveRequestViewModel } from '../../../Models/LeaveRequestViewModel';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { LeaveService } from '../../../Services/leave.service';
import *   as utc from 'moment';
import { AttendenceViewModel } from '../../../Models/AttendenceViewModel';
import { AttendenceService } from '../../../Services/attendence.service';
import { NotificationViewModel } from '../../../Models/NotificationViewModel';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  myleaveRequests: LeaveRequestViewModel[] = []
  attendence: AttendenceViewModel[] = []
  notificationlist: NotificationViewModel[] = []


  moment = utc
  constructor(private loaderService: LoaderService, private notify: CustomToastrService,
    private leaveService: LeaveService, private attendenceService: AttendenceService,private notitficationService:NotificationService) { }
  ngOnInit() {
    this.GetAllLeaveRequests();
    this.GetAttendenceByUserId();
    this.GetAllNotificationByUser();
  }
  GetAllLeaveRequests() {
    this.loaderService.show();
    this.leaveService.GetAllMyLeaveRequests().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.myleaveRequests = res.data;
        this.myleaveRequests = this.myleaveRequests.slice(0, 5);

      }
      else {
        this.notify.showError(res.message);

      }
    })
  }

  GetAttendenceByUserId() {
    this.loaderService.show();
    this.attendenceService.GetAttendenceByUserId().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.attendence = res.data;
        this.attendence = this.attendence.slice(0,7);

      }
      else {
        this.notify.showError(res.message);

      }
    })
  }

  GetAllNotificationByUser() {
    this.loaderService.show();
    this.notitficationService.GetAllNotificationByUser().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.notificationlist = res.data;
        this.notificationlist = this.notificationlist.slice(0, 5);

      }
      else {
        this.notify.showError(res.message);
      }
    })
  }









}
