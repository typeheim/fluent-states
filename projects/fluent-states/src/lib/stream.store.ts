import {StatefulSubject, ValueSubject,} from '@typeheim/fire-rx'
import {Subject,} from 'rxjs'

export class StreamStore {
  getState<T = this>(): Omit<T, 'getState' | 'storeToState' | 'complete'> {
    // @ts-ignore
    return storeToState(this)
  }

  /**
   * Complete all subject in store
   */
  public complete() {
    completeStore(this)
  }
}

function completeStore(store: any) {
  for (const [key, value] of Object.entries(store)) {
    if (value instanceof StatefulSubject || value instanceof ValueSubject) {
      value.complete()
    }

    if (isStoreGroup(value)) {
      completeStore(store)
    }
  }
}

/**
 * Converts store to readonly state
 */
function storeToState(store: any) {
  let state = {} as any[string]
  for (const [key, value] of Object.entries(store)) {
    if (value instanceof StatefulSubject || value instanceof ValueSubject) {
      state[key] = value.asStream()
    } else if (value instanceof Subject) {
      state[key] = value.asObservable()
    } else if (isStoreGroup(value)) {
      state[key] = storeToState(value)
    }
  }

  return state
}

function isStoreGroup(value: any) {
  if (!isObject(value)) {
    return false
  }

  for (let prop in value) {
    if (value instanceof Subject || (isObject(value[prop]) && isStoreGroup(value[prop]))) {
      return true
    }
  }

  return false
}

function isObject(value: any) {
  return typeof value === 'object' && value !== null
}

