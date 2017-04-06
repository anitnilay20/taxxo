import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../dashboard/model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    private user = new Subject<User>();
    user$ = this.user.asObservable();
    private userUrl = 'http://52.37.146.59/customer/';
    constructor(private http: Http) { }

    addUser(data: any): Observable<User> {
        console.log(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let option = new RequestOptions({ headers: headers });

        return this.http.post(this.userUrl, data, option)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    login(data: any): Observable<User> {
        console.log(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let option = new RequestOptions({ headers: headers });

        return this.http.post(this.userUrl + 'login/', data, option)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getuser(id: any): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let option = new RequestOptions({ headers: headers });

        return this.http.get(this.userUrl + id + '/', option)
            .map((res: Response) => res.json())
            .do(User => { this.user.next(User); console.log(this.user) }).share()
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
}
