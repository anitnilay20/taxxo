import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Voucher } from '../model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class VoucherService {
  private Url = 'http://127.0.0.1:8000'
  private current_company = localStorage.getItem('company')
  private headers = new Headers({ 'Content-Type': 'application/json', 'company': parseInt(this.current_company) });
  private option = new RequestOptions({ headers: this.headers });

  addJournal(data: any): Observable<Voucher> {
    return this.http.post(this.Url + '/journal/', data, this.option)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addSales(data: any): Observable<Voucher> {
    return this.http.post(this.Url + '/sales/', data, this.option)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) { }
}
