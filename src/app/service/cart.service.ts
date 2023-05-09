import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShredsericeService } from './shredserice.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private sharedser: ShredsericeService
  ) {}

  addcart(Item) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return this.http
      .post('http://' + this.sharedser.ip_adress + ':4000/addcart', {
        item: { ...Item, quantity: 1 },
        userid: user.id,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          throw new Error(err);
        })
      );
  }

  getcart() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return this.http
      .get('http://' + this.sharedser.ip_adress + ':4000/cart/' + user.id)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw new Error(err);
        })
      );
  }

  deletecartitem(itemid){
    const user = JSON.parse(sessionStorage.getItem('user'));
    return this.http
      .delete('http://' + this.sharedser.ip_adress + ':4000/cart/' + user.id + '/' + itemid)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw new Error(err);
        })
      );
  }


}
