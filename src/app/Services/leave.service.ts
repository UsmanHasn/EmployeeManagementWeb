import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";
import { RegisterUser } from "../Models/RegisterUser";
import { LoginRequest } from "../Models/LoginRequest";
import { UserInfo } from "../Models/UserInfo";
import { BehaviorSubject, Observable } from "rxjs";
import { AddLeave } from "../Models/AddLeave";


@Injectable({
    providedIn: 'root'
})

export class LeaveService {
    

    constructor(private fetchWrapper: FetchWrapper) {

    }

   
    AddLeave(model: AddLeave){
        return this.fetchWrapper.postRequest('/Leave/AddLeaveRequest', model)
    }

    GetLeaveRequestTypes(){
        return this.fetchWrapper.getRequest('/Leave/GetLeaveRequestTypes')
    }

    GetAllMyLeaveRequests(){
        return this.fetchWrapper.getRequest('/Leave/GetAllMyLeaveRequests')
    }



}