import {StreamStore} from './stream.store'

export abstract class StateModel<T> {
  protected abstract store: StreamStore;
  protected _state: any;

  get state(): Omit<T, 'getState' | 'storeToState' | 'complete'> {
    if (!this._state) {
      this._state = this.store.getState();
    }
    return this._state;
  }

  destroy() {
    this.store.complete()
  }
}
