import { Injectable } from '@angular/core';
import { FetchWrapper } from '../Helpers/fetch_Wrapper';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private fetchWrapper: FetchWrapper) { }

  GetAllNotificationByUser(){
    return this.fetchWrapper.getRequest('/Notification/GetAllNotificationByUser')
  }

  MarkAllNotificationsAsRead(){
    return this.fetchWrapper.getRequest('/Notification/MarkAllNotificationsAsRead');
  }

  GetLatestNotifications(rows: number){
    return this.fetchWrapper.getRequest('/Notification/GetLatestNotifications?rows=' + rows)
    
  }
}
