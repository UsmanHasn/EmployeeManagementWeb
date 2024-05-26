import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './Public/public-layout/public-layout.component';
import { LoginComponent } from './Public/login/login.component';
import { RegisterComponent } from './Public/register/register.component';
import { ForgotPasswordComponent } from './Public/forgot-password/forgot-password.component';
import { CreatePasswordComponent } from './Public/create-password/create-password.component';
import { PrivateLayoutComponent } from './Private/Layout/private-layout/private-layout.component';
import { MyAttendenceComponent } from './Private/Staff/my-attendence/my-attendence.component';
import { DashboardComponent } from './Private/Staff/dashboard/dashboard.component';
import { NotificationsComponent } from './Private/Shared/notifications/notifications.component';
import { LeaveRequestComponent } from './Private/Staff/leave-request/leave-request.component';
import { ProfileComponent } from './Private/Shared/profile/profile.component';
import { AdminDashboardComponent } from './Private/Admin/admin-dashboard/admin-dashboard.component';
import { LeaveRequestsComponent } from './Private/Admin/leave-requests/leave-requests.component';
import { MyLeaveRequestsComponent } from './Private/Staff/my-leave-requests/my-leave-requests.component';
import { AddEmployeeComponent } from './Private/Admin/add-employee/add-employee.component';



const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent,

    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },

    ],

  },
  {
    path: 'staff', component: PrivateLayoutComponent,

    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'my-attendence', component: MyAttendenceComponent },
      { path: 'add-leave-request', component: LeaveRequestComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'create-password', component: CreatePasswordComponent },
      { path: 'my-leave-requests', component: MyLeaveRequestsComponent },



    ],

  },
  {
    path: 'admin', component: PrivateLayoutComponent,

    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'leave-requests', component: LeaveRequestsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'create-password', component: CreatePasswordComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'add-new-employee', component: AddEmployeeComponent },



    ],

  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
