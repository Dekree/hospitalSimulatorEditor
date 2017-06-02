import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import 'font-awesome/css/font-awesome';
import 'shared/styles/main.less';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentsHelper } from 'ng2-bootstrap/components/utils/components-helper.service';
import { NotificationsService } from 'angular2-notifications/lib/notifications.service';
import { DialogsService } from 'shared/services/dialogs/services/dialogs.service';
import { CurrentUserService } from 'shared/modules/current-user/services/current-user.service';

@Component( {
    selector: 'app',
    templateUrl: './app.tpl.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [ './app.style.less' ],
    providers: [
        NotificationsService,
        DialogsService
    ]
} )

export class AppComponent {
    private router: Router;
    private wasCameByLink: boolean = false;
    public notificationOptions: any = {
        position: ['top', 'right'],
        timeOut: 5000,
        showProgressBar: false
    };

    constructor( componentsHelper: ComponentsHelper,
                 vcr: ViewContainerRef,
                 router: Router,
                 private currentUserService: CurrentUserService,
                 protected route: ActivatedRoute) {

        componentsHelper.setRootViewContainerRef( vcr );

        this.router = router;
    }

    ngOnInit() {
        if( location.pathname.search(/\/clinical-knowledge-manager\/[^$]/) > -1 ) {
            this.wasCameByLink = true;
        }
    }

    hasUserPermission(): boolean {
        return this.currentUserService.hasRoleClaim( 'user-admin-read' ) || this.currentUserService.hasRoleClaim( 'user-admin-write' );
    }

    hasExtsysPermission(): boolean {
        return this.currentUserService.hasRoleClaim( 'extsys-admin' );
    }

    hasAuthzPermission(): boolean {
        return this.currentUserService.hasRoleClaim( 'authz-admin' );
    }

    hasSubscriptionPermission(): boolean {
        return this.currentUserService.hasRoleClaim( 'subscription-admin' );
    }

    hasCkmPermission(): boolean {
        return this.currentUserService.hasRoleClaim( 'ckm-admin' );
    }

    public isUserAuthorized(): boolean {
        return this.currentUserService.getUserInfo() != null;
    }

}
