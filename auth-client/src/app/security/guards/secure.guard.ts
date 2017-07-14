import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class SecureGuard implements CanActivate {

    constructor(private localStorageService: LocalStorageService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authentication: any = this.localStorageService.get('authentication');

        if (authentication && authentication.token) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
