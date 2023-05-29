import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShredsericeService } from './shredserice.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private shareser: ShredsericeService) {}
  fetchemployee() {
    return this.http
      .get('http://' + this.shareser.ip_adress + ':4000/deliveryman')
      .pipe(
        catchError((err) => {
          throw new Error('server error');
        })
      );
  }
}
