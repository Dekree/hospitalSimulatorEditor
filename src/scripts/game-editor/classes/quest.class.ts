import { IRubric, IQuest, IStep } from '../interfaces';

export class Quest implements IQuest {

    _id: string;
    name: string;

    rubric: IRubric;

    private steps: IStep[];

    constructor( _id: string, name: string, rubric: IRubric, steps?: IStep[] ) {
        this._id = _id;
        this.name = name;
        this.rubric = rubric;
        this.setSteps( steps );
    }

    private getStepById( stepId: string ): IStep {
        for( let i: number = 0, ii: number = this.steps.length; i < ii; i += 1 ) {
            let step: IStep = this.steps[ i ];

            if( step._id === stepId ) {
                return step;
            }
        }

        return null;
    }

    addStep( step: IStep ): void {
        this.steps.push( step );
    }

    updateStep( stepId: string, stepMetadata: any ): boolean {
        let step: IStep = this.getStepById( stepId );

        if( typeof step !== null ) {
            step.setMetadata( stepMetadata );

            return true;
        }

        return false;
    }

    deleteStep( stepId: string ): boolean {
        for( let i: number = 0, ii: number = this.steps.length; i < ii; i += 1 ) {
            let step: IStep = this.steps[ i ];

            if( step._id === stepId ) {
                this.steps.splice( i, 1 );

                return true;
            }
        }

        return false;
    }

    getAllSteps(): IStep[] {
        return this.steps;
    }

    getStep( stepId: string ): IStep {
        return this.getStepById( stepId );
    }

    setSteps( steps: IStep[] ): void {
        if( typeof steps !== 'undefined' && steps.length > 0 ) {
            this.steps = steps;
        }
    }

}
