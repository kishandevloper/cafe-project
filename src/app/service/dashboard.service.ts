import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ShredsericeService } from './shredserice.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient , private shareser : ShredsericeService) {}

  countall() {
    return this.http.get('http://' + this.shareser.ip_adress +':4000/count').pipe(
      catchError((err) => {
        throw new Error('server error');
      })
    );
  }
}
