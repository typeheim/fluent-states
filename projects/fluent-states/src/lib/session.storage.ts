import {storageAvailable} from './utils'
import {Storage} from './storage.contract'
import {MemoryStorage} from './memory.storage'

export class BrowserSessionStorage {
  /**
   * Contains available storage implementation
   *
   * @param {AbstractStorage}
   */
  private readonly storage: Storage

  public constructor() {
    if (storageAvailable('sessionStorage')) {
      this.storage = window.sessionStorage
    } else {
      this.storage = new MemoryStorage()
    }
  }

  get length(): number {
    return this.storage.length
  }

  clear(): void {
    this.storage.clear()
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key)
  }

  key(index: number): string | null {
    return this.storage.key(index)
  }

  removeItem(key: string): void {
    this.storage.removeItem(key)
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value)
  }
}
