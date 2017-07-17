import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameEditorPageComponent } from '../game-editor/components/game-editor-page';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/rubrics', pathMatch: 'full' },
    { path: 'rubrics', component: GameEditorPageComponent },
    { path: 'error/:message', component: PageNotFoundComponent }
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
