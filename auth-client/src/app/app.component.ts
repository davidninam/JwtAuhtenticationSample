import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "./security/authentication.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "angular-2-local-storage";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private username: string;
    private authenticated: boolean;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit() {
        this.setAuthentication(this.localStorageService.get('authentication'));

        this.authService.authentication
            .subscribe(res => {
                this.setAuthentication(res);
            });
    }

    private setAuthentication(authentication){
        if(!authentication) return;
        this.username = authentication.username;
        this.authenticated = !!authentication.username && authentication.token;
    }

    logout() {
        this.authService.logout()
            .take(1)
            .subscribe(success => {
                if (success) this.router.navigate(['']);
            })
    }
}
