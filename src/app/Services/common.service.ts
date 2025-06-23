import { Injectable } from "@angular/core";
import { FetchWrapper } from "../Helpers/fetch_Wrapper";



@Injectable({
    providedIn: 'root'
})

export class CommonService {
    

    constructor(private fetchWrapper: FetchWrapper) {

    }

   
   

    GetDropDownForDepartment(){
        return this.fetchWrapper.getRequest('/Common/GetDropDownForDepartment')
    }

   



}