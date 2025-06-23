import { Component } from '@angular/core';
import { UserViewModel } from '../../../Models/UserViewModel';
import { ToggleStatus } from '../../../Models/ToggleStatus';
import { Utils } from '../../../Helpers/Utils';
import * as utc  from 'moment';
import { LoaderService } from '../../../Services/loader.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrl: './designation-list.component.css'
})
export class DesignationListComponent {

  userviewmodel: UserViewModel[] = [] 
  markuser =  new ToggleStatus
  apiURL = Utils.GetApiUrl()
  moment = utc

  constructor(private loaderServic: LoaderService,private notify: CustomToastrService,private adminService: AdminService){


  }

  
    ngOnInit(){
      this.GetAllDesignation();
    }

    GetAllDesignation(){
      this.loaderServic.show();
      this.adminService.GetAllDesignation().subscribe(res=>{
        this.loaderServic.hide();
        if(res.statusCode === 200){
          this.userviewmodel =  res.data;
          console.log(this.userviewmodel)

        }
        else{
          this.notify.showError(res.message)
        }
      })
    }

    
  ToggleStatus(event: any, identifier: string) {
    this.loaderServic.show();
    this.markuser.identifier = identifier
    this.markuser.status     =  event.target.checked
    console.log(this.markuser)
    this.adminService.MarkUserAsIsActiveOrInActive(this.markuser).subscribe(res => {
      this.loaderServic.hide()
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
    this.loaderServic.show()
    this.adminService.MarkUserAsDeleted(identifier).subscribe(res =>{
      this.loaderServic.hide()
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
// export class DesignationListComponent {

// }
