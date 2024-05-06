import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../Environments/environment';
import { UserInfo } from '../Models/UserInfo';
import { LoaderService } from '../Services/loader.service';
import { CustomToastrService } from '../Services/customToastr.service';

@Injectable({
  providedIn: 'root'
})


export class FetchWrapper {

  constructor(private http: HttpClient, private loaderService: LoaderService, private notify: CustomToastrService,
    private router: Router) { }

  getLoggedInUserData(): UserInfo | null {
    const userData = localStorage.getItem('UserData');
    return userData ? JSON.parse(userData) : null;
  }
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error.status === 0) {
      this.loaderService.hide()
      this.notify.showError('An error occurred')
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.router.navigate(['']);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.status === 401) {
        this.loaderService.hide()

        this.notify.showWarning('Kindly login to Continue')

        console.log("unauthorized");
      } else {
        this.loaderService.hide()

        this.notify.showError('Something went  wrong')

        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  private httpOptions(): HttpHeaders {
    // Use string interpolation to conditionally include the token or pass an empty string
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getLoggedInUserData() ? this.getLoggedInUserData()?.authToken : ''}`
    });
  }

  private httpOptionsForFormData(): HttpHeaders {
    // Use string interpolation to conditionally include the token or pass an empty string
    return new HttpHeaders({
      Authorization: `Bearer ${this.getLoggedInUserData() ? this.getLoggedInUserData()?.authToken : ''}`
    });
  }

  getRequest(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}${url}`, { headers: this.httpOptions() })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  postRequest(url: string, data: any = {}): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}${url}`, data, { headers: this.httpOptions() })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  postFormRequest(url: string, data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}${url}`, data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  postFormRequestWithAuth(url: string, data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}${url}`, data, { headers: this.httpOptionsForFormData() })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
