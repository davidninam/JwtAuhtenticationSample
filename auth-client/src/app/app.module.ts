import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {AppRouterModule} from "./app.routes";
import {LoginModule} from "./login/login.module";
import {HomeModule} from "./home/home.module";
import {UserModule} from "./user/user.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        AppRouterModule,
        LoginModule,
        HomeModule,
        UserModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
