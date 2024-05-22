import { Component } from '@angular/core';
import { attendences } from './data';
import { AttendenceViewModel } from '../../Models/AttendenceViewModel';
import { LoaderService } from '../../Services/loader.service';
import { CustomToastrService } from '../../Services/customToastr.service';
import { AttendenceService } from '../../Services/attendence.service';

@Component({
  selector: 'app-my-attendence',
  templateUrl: './my-attendence.component.html',
  styleUrl: './my-attendence.component.css'
})
export class MyAttendenceComponent {
  attendence: AttendenceViewModel[] = []

  constructor(private loaderService: LoaderService, private notify: CustomToastrService, private attendenceService: AttendenceService) { }
  ngOnInit(){
    this.GetAttendenceByUserId();
  }
  GetAttendenceByUserId() {
    this.loaderService.show();
    this.attendenceService.GetAttendenceByUserId().subscribe(res => {
      this.loaderService.hide();
      if (res.statusCode === 200) {
        this.attendence = res.data;

      }
      else {
        this.notify.showError(res.message);

      }
    })
  }

  



}
