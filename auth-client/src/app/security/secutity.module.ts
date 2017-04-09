import {NgModule} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {HttpModule} from "@angular/http";
import {SecureGuard} from "./guards/secure.guard";
import {LocalStorageModule} from "angular-2-local-storage";
import {InsecureGuard} from "./guards/insecure.guard";

@NgModule({
    imports: [
        HttpModule,
        LocalStorageModule.withConfig({
            prefix: 'auth-app',
            storageType: 'localStorage'
        })
    ],
    providers: [
        SecureGuard,
        InsecureGuard,
        AuthenticationService
    ]
})
export class SecurityModule {
}
