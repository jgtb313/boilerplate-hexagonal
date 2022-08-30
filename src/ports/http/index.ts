import { IDependencies } from '@/core/shared/types'

import { HTTPMethods } from './support'

export * from './modules'

export type IRouteInput<T, E, K, P> = {
  query: T
  params: E
  body: K
  headers: P
}

export type IRoute = {
  path: string
  method: HTTPMethods,
  execute: any
}

export type IModuleRoute = {
  [k: string]: IRoute
}

export type IServer = {
  start(dependencies: IDependencies): Promise<void>
}
