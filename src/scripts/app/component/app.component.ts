import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import 'styles/main.less';
import { Router, ActivatedRoute } from '@angular/router';

@Component( {
    selector: 'app',
    templateUrl: './app.tpl.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [ './app.style.less' ]
} )

export class AppComponent {
    private router: Router;
    private wasCameByLink: boolean = false;
    public notificationOptions: any = {
        position: ['top', 'right'],
        timeOut: 5000,
        showProgressBar: false
    };

    constructor( vcr: ViewContainerRef,
                 router: Router,
                 protected route: ActivatedRoute ) {

        this.router = router;
    }

}
