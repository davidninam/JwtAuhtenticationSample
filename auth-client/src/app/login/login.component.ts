import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../shared/services/http.service";
import {AuthenticationService} from "../security/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private form: FormGroup;
    private loading:boolean;

    constructor(private http: HttpService,
                private authService: AuthenticationService,
                private router: Router,
                private formBuilder: FormBuilder
    ) {
        this.loading = false;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        this.loading = true;
        this.authService.login(this.form.value.username, this.form.value.password)
            .subscribe(success => {
                this.loading = false;
                if(success) this.router.navigate(['/home']);
            });
    }

    getUser() {
        this.http.get('/api/user')
            .subscribe(res => console.log(res));
    }

    logout() {
        this.authService.logout()
            .subscribe(res => console.log(res));
    }
}
