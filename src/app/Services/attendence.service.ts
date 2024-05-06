import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";
import { RegisterUser } from "../Models/RegisterUser";
import { LoginRequest } from "../Models/LoginRequest";
import { UserInfo } from "../Models/UserInfo";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AttendenceService {

    constructor(private fetchWrapper: FetchWrapper) {

    }

    TimeIn(Id: number) {
        return this.fetchWrapper.getRequest('/Attendence/TimeIn?Id=' + Id)
    }

    TimeOut(Id: number) {
        return this.fetchWrapper.getRequest('/Attendence/TimeOut?Id=' + Id)
    }





}