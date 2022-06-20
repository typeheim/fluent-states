import {ValueSubject} from '@typeheim/fire-rx'
import {MemoryStorage} from './memory.storage';
import {Storage} from './storage.contract'
import {BrowserSessionStorage} from './session.storage'
import {BrowserLocalStorage} from './local.storage';


export class StoreSubject<T> extends ValueSubject<T> {
    private constructor(value: T, protected storage?: Storage, protected id?: string) {
        super(value)
    }

    static inMemory<T>(id: string, value: T): StoreSubject<T> {
        return new StoreSubject(value, new MemoryStorage());
    }

    static localStore<T>(id: string, value: T): StoreSubject<T> {
        return new StoreSubject(value, new BrowserLocalStorage());
    }

    static sessionStore<T>(id: string, value: T): StoreSubject<T> {
        return new StoreSubject(value, new BrowserSessionStorage());
    }

    purge() {

    }
}
