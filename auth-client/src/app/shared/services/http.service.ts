import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Promise} from 'es6-promise';
import {LocalStorageService} from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HttpService {

    private requestCount: number;
    private _loading: Subject<boolean>;

    public get loading(): Observable<boolean> {
        return this._loading.asObservable();
    }

    constructor(private http: Http,
                private localStorageService: LocalStorageService,
                private router: Router) {
        this.requestCount = 0;
        this._loading = new Subject<boolean>();
        this._loading.next(false);
    }

    private buildHeaders(): Headers {
        const authentication: any = this.localStorageService.get('authentication');
        const headers: Headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
        if (authentication && authentication.token) {
            headers.append('Authorization', 'Bearer ' + authentication.token);
        }
        return headers;
    }

    public get(url: string): Observable<any> {
        this.setLoading(true);
        return this.http.get(url, {headers: this.buildHeaders()})
            .map(res => res.json())
            .finally(() => this.setLoading(false))
            .catch(error => this.handleError(error, url));
    }

    public delete(url: string): Observable<any> {
        this.setLoading(true);
        return this.http.delete(url, {headers: this.buildHeaders()})
            .map(res => res.json())
            .finally(() => this.setLoading(false))
            .catch(error => this.handleError(error, url));
    }

    public post(url: string, data?: any): Observable<any> {
        this.setLoading(true);
        return this.http.post(url, data, {headers: this.buildHeaders()})
            .map(res => res.json())
            .finally(() => this.setLoading(false))
            .catch(error => this.handleError(error, url));
    }

    public put(url: string, data?: any): Observable<any> {
        this.setLoading(true);
        return this.http.put(url, data, {headers: this.buildHeaders()})
            .map(res => res.json())
            .finally(() => this.setLoading(false))
            .catch(error => this.handleError(error, url));
    }

    private setLoading(loading: boolean) {
        const lastVal = this.requestCount;

        if (loading) {
            this.requestCount++;
        } else {
            this.requestCount--;
        }

        if (this.requestCount === 0) this._loading.next(false);
        if (this.requestCount === 1 && lastVal === 0) this._loading.next(true);
    }

    private handleError(error: any, url: string): Promise<any> {
        if (error.status === 403) {
            this.localStorageService.remove('authentication');
            this.router.navigate(['/']);
        }
        console.error('An error occurred with request to ', url);
        return Promise.reject(error);
    }
}