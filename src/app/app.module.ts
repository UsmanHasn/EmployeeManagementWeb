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
import { DashboardComponent } from './Private/dashboard/dashboard.component';
import { MyAttendenceComponent } from './Private/my-attendence/my-attendence.component';
import { ProfileComponent } from './Private/profile/profile.component';
import { NotificationsComponent } from './Private/notifications/notifications.component';
import { LeaveRequestComponent } from './Private/leave-request/leave-request.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
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
    LeaveRequestComponent
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
    CalendarModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
