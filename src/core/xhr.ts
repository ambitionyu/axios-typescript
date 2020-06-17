import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse
} from '../types'
import {
  paraseHeaders
} from '../helpers/header'
import {
  createError
} from '../helpers/error'
import {
  isURLSameOrigin
} from '../helpers/url';
import cookie from '../helpers/cookie'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null, url, method = 'get', headers, responseType, timeout, cancelToken,
        withCredentials,
        xsrfCookieName,
        xsrfHeaderName
    } = config
    const request = new XMLHttpRequest()
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    if (withCredentials) {
      request.withCredentials = true
    }
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue
      }
    }
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = paraseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    request.onerror = function handleError() {
      reject(createError('network error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED',
        request))
    }
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`request failed with status code ${response.status}`, config, null,
          request, response))
      }
    }
  })
}
