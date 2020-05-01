
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CscService {

  apiBaseUrl = 'http://localhost:8002/';

  constructor(private http: HttpClient) { }

  getCountries() {
    ///console.log('About to bind scroll effects');
    //alert(this.http.get(`https://api.printful.com/countries`));
   // return this.http.get(`${this.apiBaseUrl}countries/all`).pipe(
    //  catchError(this.handleError)
    //console.log('**********************');
    //console.log(this.http.get(`https://api.printful.com/countries`));
      return this.http.get(`${this.apiBaseUrl}countries/all`);
      

    }
 
    getCountries1() {
      return this.http.get(`https://api.printful.com/countries`).pipe(
        catchError(this.handleError)
      );
      


    }

  getStates(countryId: number) {
   // alert("Hi states");
    return this.http.get(`${this.apiBaseUrl}states/id?byId=${countryId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCities(stateId: number) {
    return this.http.get(`${this.apiBaseUrl}cities/id?byId=${stateId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}