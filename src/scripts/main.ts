import 'core-js/client/shim.min';
import 'zone.js/dist/zone';
import 'reflect-metadata/Reflect';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if( window['ENV'] == 'production' ) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule( AppModule );
