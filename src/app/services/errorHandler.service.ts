import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.error("The Error :", error);
    return throwError(this.getErrorMessage(error));
  }
  getErrorMessage(error: HttpErrorResponse): string {
    let errMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      errMessage =
        "A client-side or network error occurred. Please try again later.";
    } else {
      switch (error.status) {
        case 400:
          errMessage = "Bad Request. Please check your input.";
          break;
        case 401:
          errMessage = "Unauthorized. Please log in.";
          break;
        case 403:
          errMessage = "Forbidden. You do not have permission to access this resource.";
          break;
        case 404:
          errMessage = "Not Found. The requested resource could not be found.";
          break;
        case 500:
          errMessage = "Internal Server Error. Please try again later.";
          break;
          default:
            errMessage='An unexpected error occurred. Please try again later.';
      }
    }
    console.log(errMessage)
    return errMessage;
  }
}
