import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeartBeatLoaderComponent } from './components/heart-beat-loader';
import { GameLoaderService } from './services';

@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],

    exports: [
        HeartBeatLoaderComponent
    ],

    declarations: [
        HeartBeatLoaderComponent
    ],
    providers: [
        GameLoaderService
    ]
} )

export class GameLoaderModule {
}
