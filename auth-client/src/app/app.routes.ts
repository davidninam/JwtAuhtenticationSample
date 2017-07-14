import {RouterModule, Routes} from '@angular/router';
import {SecureGuard} from './security/guards/secure.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {InsecureGuard} from './security/guards/insecure.guard';
import {UserComponent} from './user/user.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [
            InsecureGuard
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [
            SecureGuard
        ]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [
            SecureGuard
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }

];
export let AppRouterModule = RouterModule
    .forRoot(
        APP_ROUTES,
        {
            useHash: false
        }
    );