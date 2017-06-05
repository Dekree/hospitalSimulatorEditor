import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications/dist';
import { CovalentDialogsModule } from '@covalent/core';

import { GameEditorModule } from 'game-editor/game-editor.module';

import { AppComponent } from './component/app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,

        SimpleNotificationsModule,
        CovalentDialogsModule,

        AppRoutingModule,

        GameEditorModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ],

    providers: []
} )

export class AppModule {
}
