import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './Public/public-layout/public-layout.component';
import { LoginComponent } from './Public/login/login.component';
import { RegisterComponent } from './Public/register/register.component';
import { ForgotPasswordComponent } from './Public/forgot-password/forgot-password.component';
import { CreatePasswordComponent } from './Public/create-password/create-password.component';
import { PrivateLayoutComponent } from './Private/Layout/private-layout/private-layout.component';
import { DashboardComponent } from './Private/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent,

    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'create-password', component: CreatePasswordComponent },
     
    ],
    
  },
  {
    path: '', component: PrivateLayoutComponent,

    children: [
      { path: 'dashboard', component: DashboardComponent },
    
     
    ],
    
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
