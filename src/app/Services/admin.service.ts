import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";
import { ApproveOrRejectLeave } from "../Models/ApproveOrRejectLeave";




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








}