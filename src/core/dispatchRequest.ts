import {AxiosRequestConfig,AxiosPromise, AxiosResponse} from '../types'
import xhr from './xhr'
import {buildURL} from '../helpers/url'
import { transformRequest } from '../helpers/data'
import {processHeaders,flattenHeaders} from '../helpers/header'
import {transformResponse} from '../helpers/util'
import transform from './transform'
export default function dispatchRequest(config:AxiosRequestConfig):AxiosPromise{
  throwIfCancellationRequested(config)
  processConfig(config)
  processConfig(config)
  return xhr(config).then((res)=>{
    return transformResponseData(res)
  })
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
function processConfig(config:AxiosRequestConfig):void{
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}
function transformURL(config:AxiosRequestConfig){
  const {url,params} = config
  return buildURL(url!,params)
}
function transformData(config:AxiosRequestConfig):any{
  return transformRequest(config.data)
}
function transformHeaders(config:AxiosRequestConfig):any{
  const {headers = {} ,data} = config
  return processHeaders(headers,data)
}
function transformResponseData(res:AxiosResponse):AxiosResponse{
  res.data = transformResponse(res.data)
  return res
}