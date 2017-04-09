import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/services/http.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    private username: string;
    private authorities: any[];

    constructor(private http: HttpService) {
    }

    ngOnInit() {
        this.http.get('/api/user')
            .take(1)
            .subscribe(user => {
                this.username = user.name;
                this.authorities = user.authorities;
            });
    }

}
