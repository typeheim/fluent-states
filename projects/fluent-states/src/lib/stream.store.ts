import {StatefulSubject, ValueSubject,} from '@typeheim/fire-rx'
import {Subject, Subscribable,} from 'rxjs'
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
            } catch (error) {
            }
            //@ts-ignore
        } else if (value?.unsubscribe && typeof value.unsubscribe == "function") {
            try {
                //@ts-ignore
                value.unsubscribe()
            } catch (error) {
            }
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
        } else if (isSubscribable(value)) {
            state[key] = value
        }
    }

    return state
}

function isSubscribable(obj: any | Subscribable<any>): obj is Subscribable<any> {
    return !!obj && typeof obj.subscribe === 'function';
}
