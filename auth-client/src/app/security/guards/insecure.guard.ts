import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class InsecureGuard implements CanActivate {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let authentication: any = this.localStorageService.get('authentication');

        if(authentication && authentication.token){
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}
