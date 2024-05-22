
import { Injectable } from '@angular/core';


import { environment } from '../Environments/environment';


@Injectable({
    providedIn: 'root'
})


export class Utils {
    public static GetApiUrl(): string {
        return environment.apiUrl
    }
}