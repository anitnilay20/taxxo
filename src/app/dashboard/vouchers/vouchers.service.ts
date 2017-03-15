import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Voucher } from '../model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class VoucherService {
  private voucherUrl = 'http://52.37.146.59/'
  private current_company = localStorage.getItem('company')
  constructor(private http: Http) { }

  addVoucher(data: any, type: string): Observable<Voucher> {
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json', 'company': parseInt(this.current_company) });
    let option = new RequestOptions({ headers: headers });
    return this.http.post(this.voucherUrl + type + '/', data, option)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
}
