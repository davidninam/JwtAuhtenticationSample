import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Http} from "@angular/http";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class AuthenticationService {

    private _authentication: Subject<any>;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
        this._authentication = new Subject();
    }

    get authentication(){
        return this._authentication.asObservable();
    }

    public login(username: string, password: string): Observable<boolean> {
        this.localStorageService.remove('authentication');

        let loggedIn: Subject<boolean> = new Subject();

        this.http.post('/api/login', {username: username, password: password})
            .subscribe(response => {
                let token = null;
                if (!!response.headers && !!response.headers.getAll('Authorization')) {
                    token = response.headers.getAll('Authorization')[0];
                }
                let authentication = {token: token, username: username};
                this.localStorageService.set('authentication', authentication);
                this._authentication.next(authentication);
                loggedIn.next(!!token);
            });
        return loggedIn.asObservable();
    }

    public logout(): Observable<boolean> {
        let loggedOut: Subject<boolean> = new Subject();
        this.http.get('/api/logout').subscribe(() => {
            this.localStorageService.remove('authentication');
            this._authentication.next({});
            loggedOut.next(true);
        });
        return loggedOut;
    }
}
