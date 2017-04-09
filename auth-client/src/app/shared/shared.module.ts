import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpService} from "./services/http.service";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {SecurityModule} from "../security/secutity.module";
import {LocalStorageModule} from "angular-2-local-storage";

@NgModule({
    declarations: [
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        SecurityModule
    ],
    providers: [
        HttpService
    ],
    exports: [
        BrowserModule,
        ReactiveFormsModule,
        SecurityModule,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {
}
