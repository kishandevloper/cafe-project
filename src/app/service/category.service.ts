import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ShredsericeService } from './shredserice.service';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient , private sharedser : ShredsericeService) {}
  getcategory(): Observable<Category[]> {
    return this.http.get<Category[]>('http://'+ this.sharedser.ip_adress +':4000/categorys').pipe(
      catchError((err) => {
        console.log(err.message);
        return throwError('response is not provide by server');
      })
    );
  }
  addcategory(name: string) {
    return this.http.post<any>('http://'+ this.sharedser.ip_adress +':4000/categorys', {
      name: name,
    });
  }
  updatecategory(id: string, updatename: string) {
    return this.http
      .put<Category>('http://'+ this.sharedser.ip_adress +`:4000/categorys/${id}`, {
        name: updatename,
      })
      .pipe(
        tap((category) => {
          if (!category.name || !category._id) {
            throw new Error('invalide response');
          }
        })
      );
  }

}
