import {SampleStore,} from './stubs/store'
import {ReactiveStream} from '@typeheim/fire-rx'
import {Observable} from 'rxjs'


describe('StreamStore', () => {
    it('converts store to readonly state', () => {
        const store = new SampleStore()

        let state = store.getState()

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

    it('can complete all subjects', () => {
        const store = new SampleStore()

        store.complete()

        expect(store.statefulSubject.isStopped).toBeTrue()
        expect(store.valueSubject.isStopped).toBeTrue()
        expect(store.replaySubject.isStopped).toBeTrue()
        expect(store.behaviorSubject.isStopped).toBeTrue()
        expect(store.subject.isStopped).toBeTrue()
    })
})
