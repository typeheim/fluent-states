import {StatefulSubject, ValueSubject,} from '@typeheim/fire-rx'
import {Observable, Subject,} from 'rxjs'
import {State} from "./contracts";


export class StreamStore {
  getState(): State<this> {
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
    //@ts-ignore
    if (value?.complete && typeof value.complete == "function") {
      try {
        //@ts-ignore
        value.complete()
      } catch (error) {}
      //@ts-ignore
    } else if (value?.unsubscribe && typeof value.unsubscribe == "function") {
      try {
        //@ts-ignore
        value.unsubscribe()
      } catch (error) {}
    } else if (value instanceof Observable) {
      continue
    }
    // @todo figure out how to better support groups
    // else if (isStoreGroup(value)) {
    //   completeStore(store)
    // }
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
    } else if (value instanceof Observable) {
      state[key] = value
    }
    // @todo figure out how to better support groups
    // else if (isStoreGroup(value)) {
    //   state[key] = storeToState(value)
    // }
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

