import { Component } from '@angular/core';
import { NotificationViewModel } from '../../../Models/NotificationViewModel';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { NotificationService } from '../../../Services/notification.service';
import * as utc from 'moment';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notificationlist: NotificationViewModel[] = []
  moment = utc
  constructor(private loaderService: LoaderService, private notify: CustomToastrService,
    private notitficationService: NotificationService) {

  }
  ngOnInit() {
    this.MarkAllNotificationsAsRead();

  }
  GetAllNotificationByUser() {
    this.loaderService.show();
    this.notitficationService.GetAllNotificationByUser().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.notificationlist = res.data;
        this.notificationlist = this.notificationlist.slice(0, 7);

      }
      else {
        this.notify.showError(res.message);
      }
    })
  }

  MarkAllNotificationsAsRead() {
    this.loaderService.show();
    this.notitficationService.MarkAllNotificationsAsRead().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.GetAllNotificationByUser();


      }
      else {
        this.notify.showError(res.message);
      }
    })
  }



}
