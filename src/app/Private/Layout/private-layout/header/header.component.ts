import { Component, Output, EventEmitter } from '@angular/core';
import { AttendenceService } from '../../../Services/attendence.service';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AuthService } from '../../../Services/auth.service';
import { userInfo } from 'os';
import { UserInfo } from '../../../Models/UserInfo';
import { LatestNotifications } from '../../../Models/LatestNotifications';
import { NotificationService } from '../../../Services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showCurrentTime: boolean = false;
  currentTime: string = '';
  currentUser = new UserInfo;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false
  latestNotification = new LatestNotifications();

  constructor(private attendenceService: AttendenceService,
    private loaderService: LoaderService, private notify: CustomToastrService,
    private authService: AuthService, private notificationService: NotificationService,private router:Router) {
    this.currentUser = this.authService.getLoggedInUserData()!
  }

  ngOnInit() {
    this.GetLatestNotifications();
  }


  TimeIn() {
    this.loaderService.show();
    this.attendenceService.TimeIn().subscribe(res => {
      this.loaderService.hide()
      if (res.statusCode === 200) {
        this.currentUser.timedIn = new Date().toString();
        localStorage.setItem('UserData', JSON.stringify(this.currentUser))
        this.notify.showSuccess(res.message)
      }
      else {
        this.notify.showError(res.message)
      }
    })
  }

  TimeOut() {
    this.loaderService.show();
    this.attendenceService.TimeOut().subscribe(res => {
      this.loaderService.hide()
      if (res.statusCode === 200) {
        this.currentUser.timedOut = new Date().toString();
        localStorage.setItem('UserData', JSON.stringify(this.currentUser))
        this.notify.showSuccess(res.message)
      }
      else {
        this.notify.showError(res.message)
      }
    })
  }

  SideNavToggle() {
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)
  }

  GetLatestNotifications() {
    this.loaderService.show();
    this.notificationService.GetLatestNotifications(5).subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode == 200) {
        this.latestNotification = res.data;
      }
      else {
        this.notify.showError(res.message)
      }
    })
  }

  NavigatetoNotificationPage(){
    if(this.currentUser.userTypeId === 1){
      this.router.navigate(['/admin/notifications'])
    }
    else if(this.currentUser.userTypeId === 2){
      this.router.navigate(['/staff/notifications'])

    }
  }
}
