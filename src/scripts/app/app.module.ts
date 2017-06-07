import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications/dist';
import { CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule, CovalentFileModule,
    CovalentStepsModule, CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
    CovalentNotificationsModule, CovalentMenuModule, CovalentChipsModule, CovalentDataTableModule, CovalentJsonFormatterModule,
    CovalentMessageModule } from '@covalent/core';
import { MdButtonModule, MdListModule, MdIconModule, MdCardModule, MdMenuModule, MdInputModule, MdButtonToggleModule, MdSlideToggleModule,
    MdSelectModule, MdToolbarModule, MdTabsModule, MdTooltipModule, MdCoreModule, MdAutocompleteModule,
    MdProgressBarModule } from '@angular/material';

import { GameEditorModule } from 'game-editor';

import { AppComponent } from './component/app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule( {
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        SimpleNotificationsModule,

        // CovalentCommonModule,
        // CovalentLayoutModule,
        // CovalentMediaModule,
        // CovalentExpansionPanelModule,
        // CovalentFileModule,
        // CovalentStepsModule,
        // CovalentLoadingModule,
        CovalentDialogsModule,
        // CovalentSearchModule,
        // CovalentPagingModule,
        // CovalentNotificationsModule,
        CovalentMenuModule,
        // CovalentChipsModule,
        // CovalentDataTableModule,
        // CovalentJsonFormatterModule,
        // CovalentMessageModule,

        MdButtonModule,
        // MdListModule,
        MdIconModule,
        // MdCardModule,
        MdMenuModule,
        // MdInputModule,
        // MdButtonToggleModule,
        // MdSlideToggleModule,
        // MdSelectModule,
        MdToolbarModule,
        // MdTabsModule,
        // MdTooltipModule,
        // MdCoreModule,
        // MdAutocompleteModule,
        // MdProgressBarModule,

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
