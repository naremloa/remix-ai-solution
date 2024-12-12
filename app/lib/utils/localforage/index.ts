import type { ArraySlice } from 'type-fest'
import type { StoreSchema } from './store-schema'
import localforage from 'localforage'

type Path<T> = keyof T & string

class Store<Table extends keyof StoreSchema> {
  private store: LocalForage

  constructor(storeName: Table) {
    this.store = localforage.createInstance({
      driver: localforage.INDEXEDDB,
      name: 'ai-solution-store',
      storeName,
    })
  }

  async getItem<Key extends Path<StoreSchema[Table]>>(
    key: Key,
    ...params: ArraySlice<Parameters<LocalForage['getItem']>, 1>
  ): Promise<StoreSchema[Table][Key] | null> {
    return this.store.getItem<StoreSchema[Table][Key]>(key, ...params)
  }

  async setItem<Key extends Path<StoreSchema[Table]>>(
    key: Key,
    value: StoreSchema[Table][Key],
    ...params: ArraySlice<Parameters<LocalForage['setItem']>, 2>
  ): Promise<StoreSchema[Table][Key]> {
    return this.store.setItem(key, value, ...params)
  }

  async removeItem<Key extends Path<StoreSchema[Table]>>(
    key: Key,
    ...params: ArraySlice<Parameters<LocalForage['removeItem']>, 1>
  ) {
    return this.store.removeItem(key, ...params)
  }

  async clear(...params: ArraySlice<Parameters<LocalForage['clear']>>) {
    return this.store.clear(...params)
  }
}

export function createStore<Table extends keyof StoreSchema>(storeName: Table) {
  return new Store(storeName)
}
