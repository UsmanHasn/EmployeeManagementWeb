import { Component } from '@angular/core';
import { Chart } from 'chart.js'
import { LoaderService } from '../../../Services/loader.service';
import { AdminDashboard } from '../../../Models/AdminDashboard';
import { AdminService } from '../../../Services/admin.service';
import { CustomToastrService } from '../../../Services/customToastr.service';
import * as utc from 'moment'
import { LeaveRequestViewModel } from '../../../Models/LeaveRequestViewModel';
import { ApproveOrRejectLeave } from '../../../Models/ApproveOrRejectLeave';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  chartData: any;
  tableData: any[];
  admindashboard = new AdminDashboard()
  chartOptions: any;
  
  approveOrRejectLeave = new ApproveOrRejectLeave
  displayModal = false;
  moment = utc
  constructor(private loaderService: LoaderService, private adminService: AdminService, private notify: CustomToastrService) {


   
 

    this.tableData = [
      { name: 'Item 1', value: 'Value 1' },
      { name: 'Item 2', value: 'Value 2' },
      { name: 'Item 3', value: 'Value 3' }
    ];


    

  }
  ngOnInit() {
    this.GetAdminDashboard();
    
  }

  GetAdminDashboard() {
    this.loaderService.show();
    this.adminService.GetAdminDashboard().subscribe((res) => {
      if (res.statusCode === 200) {
        this.admindashboard = res.data;
        this.addChartData();
        this.loaderService.hide();

      }
      else {
        this.notify.showError(res.message);
      }
    })
  }

 
  
  OpenModal(identifier: string, statusId: number) {
    this.displayModal = true
    this.approveOrRejectLeave.identifier = identifier
    this.approveOrRejectLeave.statusId = statusId
  }

  addChartData() {
    this.chartData = {
      labels: this.admindashboard.employeesPresent.labels,
      datasets: [
        {
          label: 'Employees Present',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.admindashboard.employeesPresent.values
        },
        {
          label: 'Employees Absent',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.admindashboard.employeesAbsent.values
        }
      ]
    };

    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1, // Ensure steps are in whole numbers
            
          }
        }]
      }
    };
  }
  }





