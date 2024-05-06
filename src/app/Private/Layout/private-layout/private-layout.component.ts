import { Component } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {
  isSidebarHidden: boolean = false;
  sideNavStatus: boolean = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
