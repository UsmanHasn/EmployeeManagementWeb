import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";
import { ApproveOrRejectLeave } from "../Models/ApproveOrRejectLeave";
import { ToggleStatus } from "../Models/ToggleStatus";
import { UserViewModel } from "../Models/UserViewModel";




@Injectable({
    providedIn: 'root'
})

export class AdminService {


    constructor(private fetchWrapper: FetchWrapper) {

    }

    GetAllLeaveRequests() {
        return this.fetchWrapper.getRequest('/Admin/GetAllLeaveRequests')
    }

    ApproveOrRejectLeave(model: ApproveOrRejectLeave) {
        return this.fetchWrapper.postRequest('/Admin/ApproveOrRejectLeave', model);
    }

    GetAllEmployees() {
        return this.fetchWrapper.getRequest('/Admin/GetAllEmployees');
    }

    MarkUserAsIsActiveOrInActive(model: ToggleStatus) {
        return this.fetchWrapper.postRequest('/Admin/MarkUserAsIsActiveOrInActive', model)
    }

    MarkUserAsDeleted(identifier: string) {
        return this.fetchWrapper.getRequest('/Admin/MarkUserAsDeleted?Identifier=' + identifier)
    }

    GetEmployeeByIdentifier(identifier: string) {
        return this.fetchWrapper.getRequest('/Admin/GetEmployeeByIdentifier?Identifier=' + identifier)
    }

    UpdateEmployee(model: UserViewModel) {

        return this.fetchWrapper.postRequest('/Admin/UpdateEmployee', model)
    }

    GetAdminDashboard() {
        return this.fetchWrapper.getRequest('/Admin/GetAdminDashboard')
    }


}