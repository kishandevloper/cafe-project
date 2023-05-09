import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../model/item';
import { ShredsericeService } from './shredserice.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private http: HttpClient,
    private sharedser: ShredsericeService
  ) {}

  additem(payload: Item) {
    return this.http
      .post('http://' + this.sharedser.ip_adress + ':4000/items', payload)
      .pipe(
        catchError((err) => {
          throw new Error('server error');
        })
      );
  }

  getitem(): Observable<Item[]> {
    return this.http
      .get<Item[]>('http://' + this.sharedser.ip_adress + ':4000/items')
      .pipe(
        catchError((err) => {
          throw new Error('server error');
        })
      );
  }

  edititem(payload: Item): Observable<Item[]> {
    return this.http
      .put<Item[]>(
        'http://' + this.sharedser.ip_adress + ':4000/items',
        payload
      )
      .pipe(
        catchError(() => {
          throw new Error('server error');
        })
      );
  }
  deleteitem(id: string, category: string) {
    return this.http
      .delete('http://' + this.sharedser.ip_adress +`:4000/items/${id}?category=${category}`)
      .pipe(
        catchError(() => {
          throw new Error('server error');
        })
      );
  }

  getallcategory() {
    return this.http
      .get('http://' + this.sharedser.ip_adress + ':4000/allcategory')
      .pipe(
        catchError(() => {
          throw new Error('server error');
        })
      );
  }
}
