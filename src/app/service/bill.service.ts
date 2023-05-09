import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Bill } from '../model/bill';
import { ShredsericeService } from './shredserice.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient, private sharedser:ShredsericeService) {}

  addbill(payload: any): Observable<Blob> {
    return this.http.post("http://" + this.sharedser.ip_adress + ':4000/bills', payload , {responseType : 'blob'});
  }

  getbills() {
    return this.http.get("http://"+ this.sharedser.ip_adress + ':4000/bills');
  }

  deletebill(id: string) {
    return this.http.delete("http://"+ this.sharedser.ip_adress +`:4000/bills/${id}`).pipe(
      catchError((err) => {
        throw new Error('server error');
      })
    );
  }

  downloadbill(payload : any)
  {
    return this.http.post("http://"+ this.sharedser.ip_adress +':4000/getpdf', payload , {responseType : 'blob'});
  }
}
