import {StatefulSubject, ValueSubject,} from '@typeheim/fire-rx'
import {Subject} from 'rxjs'

import {StreamStore} from '../../public-api'

export class BookStore extends StreamStore {
  public shelf = new StatefulSubject()

  public archive = new ValueSubject([])

  public visitors = new Subject()

  protected closedState = new ValueSubject([])

  public norRxProp = 4
}

export class GroupStore extends StreamStore {
  public simpleGroup = {
    shelf: new StatefulSubject(),
    archive: new ValueSubject([]),
  }

  public nestedGroup = {
    subgroup1: {
      shelf: new StatefulSubject(),
      archive: new ValueSubject([]),
    },

    subgroup2: {
      shelf: new Subject(),
      archive: new Subject(),
    },
  }
}

class BookShop {
  constructor(protected store: BookStore) {
  }

  addBook(book: any) {
    this.store.shelf.next(book)
  }

  getState() {
    return this.store.getState()
  }
}



