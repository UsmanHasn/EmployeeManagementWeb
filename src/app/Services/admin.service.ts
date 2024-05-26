import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";




@Injectable({
    providedIn: 'root'
})

export class AdminService {


    constructor(private fetchWrapper: FetchWrapper) {

    }

    GetAllLeaveRequests() {
        return this.fetchWrapper.getRequest('/Admin/GetAllLeaveRequests')
    }








}