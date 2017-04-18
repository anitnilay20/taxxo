import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Company, Activity, TrialBalance, ProfitLoss, BalanceSheet } from '../model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  private companyUrl = 'http://52.37.146.59/company/';
  constructor(private http: Http) { }
  private current_company = localStorage.getItem('company')

  getCompany(): Observable<Company[]> {
    let headers = new Headers({ 'ADMIN': localStorage.getItem('user') })
    let option = new RequestOptions({ headers: headers });
    return this.http.get(this.companyUrl, option)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getActivity(id: number): Observable<Activity[]> {
    let url = 'http://52.37.146.59/activity/';
    let headers = new Headers({ 'COMPANY': id })
    let option = new RequestOptions({ headers: headers });
    return this.http.get(url, option)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTrialBalance(id: number): Observable<TrialBalance[]> {
    let url = 'http://52.37.146.59/ledgers/';
    let headers = new Headers({ 'COMPANY': id })
    let option = new RequestOptions({ headers: headers });
    return this.http.get(url, option)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProfitLoss(id: number): Observable<ProfitLoss[]> {
    let url = 'http://52.37.146.59/trialbalance/profitloss/';
    let headers = new Headers({ 'COMPANY': id })
    let option = new RequestOptions({ headers: headers });
    return this.http.get(url, option)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addCompany(data: any): Observable<Company> {
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let option = new RequestOptions({ headers: headers });

    return this.http.post(this.companyUrl, data, option)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getBalanceSheet(id: number): Observable<BalanceSheet> {
    let url = 'http://52.37.146.59/trialbalance/balancesheet/';
    let headers = new Headers({ 'COMPANY': id })
    let option = new RequestOptions({ headers: headers });
    return this.http.get(url, option)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
}
