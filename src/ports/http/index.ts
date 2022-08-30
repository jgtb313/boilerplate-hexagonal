import { IDependencies } from '@/core/shared/types'

import { HTTPMethods } from './support'

export * from './modules'

export type IRouteInput<T, K, P> = {
  query: T
  params: K,
  body: P
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
