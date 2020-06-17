export type Method = 'get' | 'GET' |
  'DELETE' | 'delete' |
  'head' | 'HEAD' |
  'options' | 'OPTIONS' |
  'post' | 'POST' |
  'PUT' | 'put' |
  'patch' | 'PATCH'
export interface AxiosRequestConfig {
  withCredentials?: boolean
  cancelToken?: CancelToken
  url ? : string
  method ? : Method
  data ? : any
  params ? : any
  headers ? : any
  responseType ? : XMLHttpRequestResponseType
  timeout ? : number
  xsrfCookieName?: string
  xsrfHeaderName?: string
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [propName: string]: any
}
export interface AxiosTransformer {
  (data: any, headers?: any): any
}
export interface AxiosResponse < T = any > {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise < T = any > extends Promise < AxiosResponse < T >> {}

export interface Axios {
  request < T = any > (config: AxiosRequestConfig): AxiosPromise < T >

    get < T = any > (url: string, config ? : AxiosRequestConfig): AxiosPromise < T >

    delete < T = any > (url: string, config ? : AxiosRequestConfig): AxiosPromise < T >

    head < T = any > (url: string, config ? : AxiosRequestConfig): AxiosPromise < T >

    options < T = any > (url: string, config ? : AxiosRequestConfig): AxiosPromise < T >

    post < T = any > (url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise < T >

    put < T = any > (url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise < T >

    patch < T = any > (url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise < T >
}

export interface AxiosInstance extends Axios {
  <
  T = any > (config: AxiosRequestConfig): AxiosPromise < T >

    <
    T = any > (url: string, config ? : AxiosRequestConfig): AxiosPromise < T >
}
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T=any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosRequestConfig): AxiosInstance
}
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}
export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}