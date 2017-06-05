import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
    {
        path: 'game-editor',
        component: GameEditorPageComponent,
        children: [
            { path: 'rubric-create', component: RubricCreatePageComponent },
            { path: 'rubrics-order', component: RubricsOrderPageComponent },
            {
                path: ':rubricId',
                component: RubricPageComponent,
                children: [
                    { path: 'edit', component: RubricEditPageComponent },
                    { path: 'quest-create', component: QuestCreatePageComponent },
                    { path: 'quests-order', component: QuestsOrderPageComponent },
                    {
                        path: ':questId',
                        component: QuestPageComponent,
                        children: [
                            { path: 'edit', component: QuestEditPageComponent },
                            { path: 'step-create', component: StepCreatePageComponent },
                            { path: 'steps-order', component: StepsOrderPageComponent },
                            {
                                path: ':stepId',
                                component: StepPageComponent,
                                children: [
                                    { path: 'edit', component: StepEditPageComponent },
                                    { path: 'step-live-view', component: StepLiveViewPageComponent }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ]
} )

export class GameEditorRoutingModule {
}
