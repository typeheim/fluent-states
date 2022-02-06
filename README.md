# FluentStates

Easy and clear state management for Angular apps.

# Getting Started

Install package

```shell
yarn add @typeheim/fire-rx
yarn add @typeheim/fluent-states
//or
npm install @typeheim/fluent-states
npm install @typeheim/fire-rx
```

# Overview

Key components of FluentStates are StateModel and StreamStore. StreamStore define store of a state and then StateModel
control all of the read and write access to the state.

## Working with state model

### Defining store model

First of all, you need to define store. Store is a calls that consist of observables that contain data. All of the state
observables must be public but you can have private/protected observables as well to create any pipes.

```typescript
import {StreamStore} from '@typeheim/fluent-states'
import {StatefulSubject, ValueSubject} from '@typeheim/fire-rx'
import {map, Subject} from 'rxjs'

export class BookStore extends StreamStore {
  private securityArchive = new ValueSubject([])

  public shelfStream = new StatefulSubject()

  public archiveStream = new ValueSubject([])

  public visitorsStream = new Subject()

  public securityArchiveIdentifiersStream = this.securityArchive.pipe(map(item => item.id))
}

// define state type to use in type definitions further on
export type BookState = State<BookStore>
```

Once you defined store, you can get readonly state that consist of all of the public properties.

```typescript
const store = new BookStore()
const state = store.getState()
```

### Defining state model

Once you defined store, you can define state model by extending it from StateModel and implementing `store` property.
Then you can define any methods to manipulate state through store.

```typescript
import {StateModel} from '@typeheim/fluent-states'

export class BookStateModel<BookStore> extends StateModel {
  protected store = new BookStore()

  public addBooks(boooks) {
    this.store.shelfStream.next(books)
  }

  public mooveBooksToArchive(boooks) {
    this.store.archiveStream.next(books)
  }
}
```

State model provide access to readonly state through readonly property `state`.

```typescript
const bookStateModel = new BookStateModel()
const bookState = stateModel.state
```
