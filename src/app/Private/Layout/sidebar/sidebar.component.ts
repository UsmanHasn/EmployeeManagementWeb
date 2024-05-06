import { Component, Input } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { UserInfo } from '../../../Models/UserInfo';
import { AdminMenu, EmployeeMenu } from './menu';
import { userInfo } from 'os';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: { title: string, link: string, icon: string }[];
  @Input() sideNavStatus : boolean = false

currentUser = new UserInfo

  constructor(private authService:AuthService) {
    this.currentUser = authService.getLoggedInUserData()!
    // Set menu items based on user type
    if (this.currentUser.userTypeId === 2) {
      this.menuItems = EmployeeMenu;
    } else if (this.currentUser.userTypeId === 1) {
      this.menuItems = AdminMenu;
    } else {
      this.menuItems = []; // Default empty menu
    }
    // this.menuItems = EmployeeMenu
  }
}
