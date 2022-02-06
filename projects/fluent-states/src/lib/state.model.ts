import {StreamStore} from './stream.store'
import {State} from "./contracts";

export abstract class StateModel<T> {
  protected abstract store: StreamStore;
  protected _state: any;

  get state(): State<T> {
    if (!this._state) {
      this._state = this.store.getState();
    }
    return this._state;
  }

  destroy() {
    this.store.complete()
  }
}
