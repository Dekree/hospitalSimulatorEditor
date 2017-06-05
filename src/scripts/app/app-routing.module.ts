import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameEditorPageComponent } from '../game-editor/components/game-editor-page';

const routes: Routes = [
    { path: '', redirectTo: '/game-editor', pathMatch: 'full' },
    { path: 'game-editor', component: GameEditorPageComponent }
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
