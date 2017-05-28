import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { API_URL } from "../../../../config";
import { Ledgers } from '../model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LedgersService {
  private LedgersUrl = API_URL + '/ledgers/'
  private current_company = localStorage.getItem('company')
  constructor(private http: Http) { }

  getLedgers(): Observable<Ledgers[]> {
    let headers = new Headers({ 'COMPANY': parseInt(localStorage.getItem('company')) })
    let option = new RequestOptions({ headers: headers });
    return this.http.get(this.LedgersUrl, option)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addLedgers(data: any): Observable<Ledgers> {
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json', 'company': parseInt(this.current_company) });
    let option = new RequestOptions({ headers: headers });
    return this.http.post(this.LedgersUrl, data, option)
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