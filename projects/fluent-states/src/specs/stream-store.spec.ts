import {BookStore, GroupStore,} from './stubs/store'
import {ReactiveStream} from '@typeheim/fire-rx'
import {Observable} from 'rxjs'


describe('RxStore', () => {
  it('converts store to readonly state', () => {
    let store = new BookStore()

    let state = store.getState()

    // All FireRx subjects must be converted to reactive streams
    expect(state.shelf).not.toBeNull()
    expect(state.shelf).toBeInstanceOf(ReactiveStream)

    expect(state.shelf).not.toBeNull()
    expect(state.archive).toBeInstanceOf(ReactiveStream)

    // All subjects must be converted to observables
    expect(state.visitors).not.toBeNull()
    expect(state.archive).toBeInstanceOf(Observable)

    // Non Rx properties should be skipped
    expect(state.norRxProp).toBeUndefined()
  })
  //

  it('can complete ass subjects', () => {
    let store = new BookStore()

    store.complete()
    //
    // All groups must be in state
    expect(store.shelf.isStopped).toBeTrue()
    expect(store.archive.isStopped).toBeTrue()
    expect(store.visitors.isStopped).toBeTrue()
    expect(store.visitors.isStopped).toBeTrue()

  })
})
