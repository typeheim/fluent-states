export type State<T> = Omit<T, 'getState' | 'storeToState' | 'complete'>;
