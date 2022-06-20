import {StatefulSubject, ValueSubject,} from '@typeheim/fire-rx'
import {BehaviorSubject, map, Observable, ReplaySubject, Subject} from 'rxjs'

import {SelectState, State, StateModel, StreamStore} from '../../src/public-api'

export class SampleStateModel extends StateModel<SampleStore> {
    protected readonly store = new SampleStore()
}

// Define store
export class SampleStore extends StreamStore {
    public statefulSubject = new StatefulSubject()

    public valueSubject = new ValueSubject([])

    public replaySubject = new ReplaySubject()

    public behaviorSubject = new BehaviorSubject([])

    public subject = new Subject()

    protected protectedValueSubject = new ValueSubject([])

    public pipeStream = this.valueSubject.pipe(map(item => item))

    public observable = new Observable()

    public norRxProp = 4
}

export type SampleState = State<SampleStore>

export class SampleComponent {
    @SelectState('stateModel') public readonly state: SampleState

    constructor(
        public readonly stateModel: SampleStateModel,
    ) {
    }

    ngOnDestroy() {
        this.stateModel.destroy()
    }
}





