import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GameEditorRoutingModule } from './game-editor-routing.module';

import { GameLoaderModule } from 'game-loader';

import { GameEditorPageComponent } from './components/game-editor-page';

import { RubricCreatePageComponent } from './components/rubric-create-page';
import { RubricsOrderPageComponent } from './components/rubrics-order-page';
import { RubricPageComponent } from './components/rubric-page';

import { RubricEditPageComponent } from './components/rubric-edit-page';
import { QuestCreatePageComponent } from './components/quest-create-page';
import { QuestsOrderPageComponent } from './components/quests-order-page';
import { QuestPageComponent } from './components/quest-page';

import { QuestEditPageComponent } from './components/quest-edit-page';
import { StepCreatePageComponent } from './components/step-create-page';
import { StepsOrderPageComponent } from './components/steps-order-page';
import { StepPageComponent } from './components/step-page';

import { StepEditPageComponent } from './components/step-edit-page';
import { StepLiveViewPageComponent } from './components/step-live-view-page';

@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        GameEditorRoutingModule,
        GameLoaderModule
    ],

    exports: [
        GameEditorPageComponent
    ],

    declarations: [
        GameEditorPageComponent,
        RubricCreatePageComponent,
        RubricsOrderPageComponent,
        RubricPageComponent,

        RubricEditPageComponent,
        QuestCreatePageComponent,
        QuestsOrderPageComponent,
        QuestPageComponent,

        QuestEditPageComponent,
        StepCreatePageComponent,
        StepsOrderPageComponent,
        StepPageComponent,

        StepEditPageComponent,
        StepLiveViewPageComponent
    ]
} )

export class GameEditorModule {
}
