export type ICache = {
  connect(): Promise<void>
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T): Promise<void>
  exists(key: string): Promise<Boolean>
  delete(key: string): Promise<void>
}
