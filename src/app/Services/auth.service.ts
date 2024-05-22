import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";
import { RegisterUser } from "../Models/RegisterUser";
import { LoginRequest } from "../Models/LoginRequest";
import { UserInfo } from "../Models/UserInfo";
import { BehaviorSubject, Observable } from "rxjs";
import { UpdateUser } from "../Models/UpdateUser";
import { ResetUserPassword } from "../Models/ResetUserPassword";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentUserSubject !: BehaviorSubject<UserInfo | null>;
    public currentUserValue = new Observable<UserInfo | null>;
    constructor(private fetchWrapper: FetchWrapper) {
        const userData = this.getLoggedInUserData();
        this.currentUserSubject = new BehaviorSubject<UserInfo | null>(userData);
        this.currentUserValue = this.currentUserSubject.asObservable();
    }

    RegisterUser(model: RegisterUser) {
        return this.fetchWrapper.postRequest('/Auth/RegisterUser', model)
    }

    LoginUser(model: LoginRequest) {
        return this.fetchWrapper.postRequest('/Auth/LoginUser', model)
    }

    getLoggedInUserData(): UserInfo | null {
        const userData = localStorage.getItem('UserData');
        return userData ? JSON.parse(userData) : null;
    }

    UploadProfilePicture(formData: FormData) {
        return this.fetchWrapper.postFormRequestWithAuth('/Auth/UploadProfilePicture', formData);
    }

    UpdateUser(model: UpdateUser) {
        return this.fetchWrapper.postRequest('/Auth/UpdateProfile', model)
    }

    LogoutUser() {
        localStorage.removeItem("UserData")
    }

    ResetUserPassword(model: ResetUserPassword) {
        return this.fetchWrapper.postRequest('/Auth/ResetUserPassword', model)

    }
}