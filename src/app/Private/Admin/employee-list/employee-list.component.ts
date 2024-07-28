import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AdminService } from '../../../Services/admin.service';
import { UserViewModel } from '../../../Models/UserViewModel';
import { ToggleStatus } from '../../../Models/ToggleStatus';
import { Utils } from '../../../Helpers/Utils';
import * as utc from 'moment'
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  userviewmodel: UserViewModel[] = []
  markuser = new ToggleStatus()
  apiUrl = Utils.GetApiUrl()
  moment = utc

  constructor(private loaderService: LoaderService, private notify: CustomToastrService, private adminService: AdminService) { }

  ngOnInit() {
    this.GetAllEmployees();
  }

  GetAllEmployees() {
    this.loaderService.show();
    this.adminService.GetAllEmployees().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.userviewmodel = res.data;
        console.log(this.userviewmodel)
      }
      else {
        this.notify.showError(res.message)
      }
    })

  }

  ToggleStatus(event: any, identifier: string) {
    this.loaderService.show();
    this.markuser.identifier = identifier
    this.markuser.status     =  event.target.checked
    console.log(this.markuser)
    this.adminService.MarkUserAsIsActiveOrInActive(this.markuser).subscribe(res => {
      this.loaderService.hide()
      if (res.statusCode === 200) {
        this.userviewmodel.find(obj => obj.identifier === identifier)!.isActive = event.target.checked

        this.notify.showSuccess(res.message)
      }
      else {
        this.notify.showError(res.message)
      }
    })
    // this.user.active = !this.user.active;
  }

  MarkUserAsDelete(identifier:string){
    this.loaderService.show()
    this.adminService.MarkUserAsDeleted(identifier).subscribe(res =>{
      this.loaderService.hide()
      if(res.statusCode === 200){
        
       const index =  this.userviewmodel.findIndex(obj => obj.identifier === identifier)!
       this.userviewmodel.splice(index, 1)
        this.notify.showSuccess(res.message)
      }
      else{
        this.notify.showError(res.message);
      }
    })
  }
}
