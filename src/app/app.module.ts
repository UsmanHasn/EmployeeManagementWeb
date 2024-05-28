import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Public/register/register.component';
import { LoginComponent } from './Public/login/login.component';
import { ForgotPasswordComponent } from './Public/forgot-password/forgot-password.component';
import { CreatePasswordComponent } from './Public/create-password/create-password.component';
import { PublicLayoutComponent } from './Public/public-layout/public-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './Shared/loader/loader.component';
import { PrivateLayoutComponent } from './Private/Layout/private-layout/private-layout.component';
import { HeaderComponent } from './Private/Layout/header/header.component';
import { SidebarComponent } from './Private/Layout/sidebar/sidebar.component';
import { FooterComponent } from './Private/Layout/footer/footer.component';
import { MyAttendenceComponent } from './Private/Staff/my-attendence/my-attendence.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { DashboardComponent } from './Private/Staff/dashboard/dashboard.component';
import { ProfileComponent } from './Private/Shared/profile/profile.component';
import { NotificationsComponent } from './Private/Shared/notifications/notifications.component';
import { LeaveRequestComponent } from './Private/Staff/leave-request/leave-request.component';
import { LeaveRequestsComponent } from './Private/Admin/leave-requests/leave-requests.component';
import { AdminDashboardComponent } from './Private/Admin/admin-dashboard/admin-dashboard.component';
import { MyLeaveRequestsComponent } from './Private/Staff/my-leave-requests/my-leave-requests.component';
import { AddEmployeeComponent } from './Private/Admin/add-employee/add-employee.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreatePasswordComponent,
    PublicLayoutComponent,
    LoaderComponent,
    PrivateLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    MyAttendenceComponent,
    ProfileComponent,
    NotificationsComponent,
    LeaveRequestComponent,
    LeaveRequestsComponent,
    AdminDashboardComponent,
    MyLeaveRequestsComponent,
    AddEmployeeComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TableModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    DialogModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
