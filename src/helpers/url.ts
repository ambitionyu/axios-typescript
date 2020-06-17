import {isDate , isObject, isPlainObject} from './util'
function encode(val:string):string{
    return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
export function buildURL(url:string,params?:any) :string{
    if(!params){
        return url
    }
    const parts:string[] = []
    Object.keys(params).forEach(key => {
        const val = params[key]
        if(val===null||typeof val === 'undefined'){
            return
        }
        let values = []
        if(Array.isArray(val)){
            values = val
            key+= '[]'
        }else{
            values = [val]
        }
        values.forEach(element => {
            if(isDate(element)){
                element = element.toISOString()
            }else if(isPlainObject(element)){
                element = JSON.stringify(element)
            }
            parts.push(`${encode(key)}=${encode(element)}`)
        });
    });
    let serialzedParams = parts.join('&')
    if(serialzedParams){
        const marIndex = url.indexOf('#')
        if(marIndex!==-1){
            url = url.slice(0,marIndex)
        }
        url += (url.indexOf('?')===-1?'?':'&')+serialzedParams
    }
    return url
}
interface URLOrigin {
    protocol: string
    host: string
  }
  
  
  export function isURLSameOrigin(requestURL: string): boolean {
    const parsedOrigin = resolveURL(requestURL)
    return (
      parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
    )
  }
  
  const urlParsingNode = document.createElement('a')
  const currentOrigin = resolveURL(window.location.href)
  
  function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode
  
    return {
      protocol,
      host
    }
  }