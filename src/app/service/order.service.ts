import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShredsericeService } from './shredserice.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private shreadser: ShredsericeService
  ) {}

  getcategory() {
    return this.http.get(
      'http://' + this.shreadser.ip_adress + ':4000/getcategory'
    );
  }

  getitems(category: string) {
    return this.http.get(
      'http://' + this.shreadser.ip_adress + `:4000/getitem?isfind=${category}`
    );
  }

  createorder(payload) {
    return this.http.post(
      'http://' + this.shreadser.ip_adress + ':4000/createorder',
      payload
    );
  }

  fetchorders(userid) {
    return this.http
      .get('http://' + this.shreadser.ip_adress + ':4000/orders/' + userid)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error('server error');
          console.log(err);
        })
      );
  }

  fetchallorders(){
    return this.http
    .get('http://' + this.shreadser.ip_adress + ':4000/allorders')
    .pipe(
      catchError((err: HttpErrorResponse) => {
        throw new Error('server error');
        console.log(err);
      })
    );
  }
}
