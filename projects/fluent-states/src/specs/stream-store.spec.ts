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

  it('converts store groups to readonly state', () => {
    let store = new GroupStore()

    let state = store.getState()

    // All groups must be in state
    expect(state.simpleGroup).not.toBeNull()
    expect(state.nestedGroup).not.toBeNull()

    // All subgroups must be in state
    expect(state.nestedGroup.subgroup1).not.toBeNull()
    expect(state.nestedGroup.subgroup2).not.toBeNull()

    // All FireRx subjects must be converted to reactive streams
    expect(state.simpleGroup.archive).not.toBeNull()
    expect(state.simpleGroup.archive).toBeInstanceOf(ReactiveStream)

    expect(state.simpleGroup.shelf).not.toBeNull()
    expect(state.simpleGroup.shelf).toBeInstanceOf(ReactiveStream)

    // All FireRx subjects must be converted to reactive streams
    expect(state.nestedGroup.subgroup1.archive).not.toBeNull()
    expect(state.nestedGroup.subgroup1.archive).toBeInstanceOf(ReactiveStream)

    expect(state.nestedGroup.subgroup1.shelf).not.toBeNull()
    expect(state.nestedGroup.subgroup1.shelf).toBeInstanceOf(ReactiveStream)

    // All subjects must be converted to observables
    expect(state.nestedGroup.subgroup2.archive).not.toBeNull()
    expect(state.nestedGroup.subgroup2.archive).toBeInstanceOf(Observable)

    expect(state.nestedGroup.subgroup2.shelf).not.toBeNull()
    expect(state.nestedGroup.subgroup2.shelf).toBeInstanceOf(Observable)
  })
})
