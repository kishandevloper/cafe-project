import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ShredsericeService } from './shredserice.service';
function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class AuthanticateService {
  get nativeWindow(): any {
    return _window();
  }
  constructor(private http: HttpClient, private shared: ShredsericeService) {}

  ragisteruser(payload: any) {
    return this.http
      .post('http://' + this.shared.ip_adress + ':4000/register', payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Handle the error here, e.g. show an error message
            console.log('Error: ' + error.error.message);
          } else {
            // Handle other types of errors
            console.error('An error occurred:', error.error);
          }

          return throwError(error.error.message);
        })
      );
  }

  loginuser(payload: any) {
    return this.http
      .post('http://' + this.shared.ip_adress + ':4000/login', payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Handle the error here, e.g. show an error message
            console.log('Error: ' + error.error.message);
          } else {
            // Handle other types of errors
            console.error('An error occurred:', error.error);
          }

          return throwError(error.error.message);
        })
      );
  }

  changepassword(payload: any) {
    return this.http
      .post('http://' + this.shared.ip_adress + ':4000/cpassword', payload)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            console.log('Error ' + err.error.message);
          } else {
            console.error('An error occurred:', err.error);
          }
          return throwError(err.error.message);
        })
      );
  }

  forgotpass(Email: any) {
    return this.http
      .post('http://' + this.shared.ip_adress + ':4000/forgotpass', {
        email: Email,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            console.log('Error ' + err.error.message);
          } else {
            console.error('An error occurred:', err.error);
          }
          return throwError(err.error.message);
        })
      );
  }

  isuserexist(Email: any) {
    return this.http
      .post('http://' + this.shared.ip_adress + ':4000/userexist', {
        email: Email,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            console.log('Error ' + err.error.message);
          } else {
            console.error('An error occurred:', err.error);
          }
          return throwError(err.error.message);
        })
      );
  }

  payment(payload) {
    return this.http.post(
      'http://' + this.shared.ip_adress + ':4000/razorpayorder',
      payload
    );
  }

  verify(payload) {
    return this.http.post(
      'http://' + this.shared.ip_adress + ':4000/verify',
      payload
    );
  }
}
