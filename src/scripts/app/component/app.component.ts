import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import 'styles/main.less';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';

@Component( {
    selector: 'app',
    templateUrl: './app.tpl.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [ './app.style.less' ],
    providers: [
        NotificationsService
    ]
} )

export class AppComponent {

    public notificationOptions: any = {
        position: ['top', 'right'],
        timeOut: 5000,
        showProgressBar: false
    };

    constructor( private vcr: ViewContainerRef,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

}
