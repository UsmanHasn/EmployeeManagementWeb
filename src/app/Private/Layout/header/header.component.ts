import { Component, Output, EventEmitter } from '@angular/core';
import { AttendenceService } from '../../../Services/attendence.service';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AuthService } from '../../../Services/auth.service';
import { userInfo } from 'os';
import { UserInfo } from '../../../Models/UserInfo';

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

  constructor(private attendenceService: AttendenceService,
    private loaderService: LoaderService, private notify: CustomToastrService,
    private authService: AuthService) {
    this.currentUser = this.authService.getLoggedInUserData()!
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
}
