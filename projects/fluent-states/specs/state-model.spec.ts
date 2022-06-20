import {SampleComponent, SampleStateModel,} from './stubs/store'
import {ReactiveStream} from '@typeheim/fire-rx'
import {Observable} from 'rxjs'


describe('StateModel', () => {
    it('can return proper state', () => {
        const stateModel = new SampleStateModel()
        const state = stateModel.state

        // All FireRx subjects must be converted to reactive streams
        expect(state.valueSubject).not.toBeNull()
        expect(state.valueSubject).toBeInstanceOf(ReactiveStream)

        expect(state.statefulSubject).not.toBeNull()
        expect(state.statefulSubject).toBeInstanceOf(ReactiveStream)

        // All subjects must be converted to observables
        expect(state.replaySubject).not.toBeNull()
        expect(state.replaySubject).toBeInstanceOf(Observable)

        expect(state.behaviorSubject).not.toBeNull()
        expect(state.behaviorSubject).toBeInstanceOf(Observable)

        expect(state.subject).not.toBeNull()
        expect(state.subject).toBeInstanceOf(Observable)

        // Observable is copied as is
        expect(state.pipeStream).not.toBeNull()
        expect(state.pipeStream.constructor.name).toBe('AnonymousSubject')

        expect(state.observable).not.toBeNull()
        expect(state.observable).toBeInstanceOf(Observable)

        // Non Rx properties should be skipped
        expect(state.norRxProp).toBeUndefined()
    })

    it('can destroy state', () => {
        const stateModel = new SampleStateModel()
        const state = stateModel.state
        const sampleComponent = new SampleComponent(stateModel)

        expect(state.statefulSubject.isStopped).toBeFalse()
        expect(state.valueSubject.isStopped).toBeFalse()

        // simulate NG behavior
        sampleComponent.ngOnDestroy()

        console.log({
            ss: state.statefulSubject.isStopped,
            vs: state.valueSubject.isStopped,
            rs: state.replaySubject.isStopped,
            bs: state.behaviorSubject.isStopped,
            s: state.subject.isStopped,
            sc: state.subject.closed
        })

        expect(state.statefulSubject.isStopped).toBeTrue()
        expect(state.valueSubject.isStopped).toBeTrue()
    })
})
