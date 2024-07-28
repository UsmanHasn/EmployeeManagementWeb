import { ChartData } from "./ChartData";
import { LeaveRequestViewModel } from "./LeaveRequestViewModel";

export class AdminDashboard {
    totalEmployeeCount: number = 0;
    pendingLeaveRequests: number = 0;
    employeeOnLeaves: number = 0;
    leaveRequests: LeaveRequestViewModel[]= []
    employeesPresent: ChartData = new ChartData
    employeesAbsent: ChartData = new ChartData
}