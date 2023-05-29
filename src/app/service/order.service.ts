import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShredsericeService } from './shredserice.service';
import { Observable, catchError } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public dataSubject = new Subject<any[]>();
  public data$: Observable<any[]> = this.dataSubject.asObservable();

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

  fetchallorders() {
    return this.http
      .get('http://' + this.shreadser.ip_adress + ':4000/allorders')
      .subscribe(
        (data: any) => {
          this.dataSubject.next(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  updateorder(id, payload) {
    return this.http
      .put(
        'http://' + this.shreadser.ip_adress + ':4000/updateorder/' + id,
        payload
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error('server error');
          console.log(err);
        })
      );
  }

  selectdelivery(orderid) {
    return this.http
      .get(
        'http://' + this.shreadser.ip_adress + ':4000/delevryselect/' + orderid
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error('server error');
          console.log(err);
        })
      );
  }

  fetchsingleorderby_orderid(id){
    return this.http
      .post(
        'http://' + this.shreadser.ip_adress + ':4000/singleorder' , {orderid : id}
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error('server error');
          console.log(err);
        })
      );
  }

  completeorder(payload){
    return this.http
      .post(
        'http://' + this.shreadser.ip_adress + ':4000/completeorder' , payload
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error('server error');
          console.log(err);
        })
      );
  }
}
