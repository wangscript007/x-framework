import screen from '@/common/constants/screen'

const { body } = document
const RATIO = 3

/* 获取屏幕大小 */
export function getScreenSize () {
  const width = body.getBoundingClientRect().width - RATIO
  const matched = Object.values(screen).find((item) => {
    return item.maxSize ? item.minSize <= width && width <= item.maxSize : item.minSize <= width
  })
  return matched ? matched.name : ''
}

/* 判断是否有滚动条 */
export function hasScrollBar () {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}

/* 获取滚动条宽度 */
export function getScrollbarWidth () {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText = 'width:99px;height:99px;overflow:scroll;position:absolute;top:-9999px;opacity:0;'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

/* 沙箱 */
export function shuffle (arr) {
  const _getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const _arr = arr.slice()
  for (let i = 0, len = _arr.length; i < len; i++) {
    const j = _getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/* 获取字符串长度 */
export function getStrLength (str = '') {
  return isEmpty(str) ? 0 : str.replace(/[\u0391-\uFFE5]/g, 'aa').length
}

/* 获取值类型 */
export function getValueType (value) {
  try {
    const typeStr = Object.prototype.toString.call(value)
    return typeStr.replace(/(.*)\[object (.*)]/g, '$1$2')
  } catch (e) {
    return 'Undefined'
  }
}

/* 判断是否数字 */
export function isNumber (value) {
  return getValueType(value) === 'Number' && !isNaN(value) && /^((-?[1-9]+[0-9]*(\.\d+)?)|(-?0\.\d+)|0)$/.test(value)
}

/* 判断是否空值 */
export function isEmpty (value) {
  if (typeof value === 'boolean') {
    return false
  }
  if (value instanceof Array && value.length === 0 || value instanceof Object && JSON.stringify(value) === '{}') {
    return true
  }
  return ['null', null, 'undefined', undefined, ''].includes(value)
}

/* 随机字符串 */
export function randomString (length = 64) {
  const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z', '2', '3', '4', '5', '6', '7', '8']
  let res = ''
  chars.forEach(() => {
    res += chars[Math.floor(Math.random() * length)]
  })
  return res
}

/*
 * 字符串占位转换
 * str：接受转换的字符串
 * params：占位符
 *
 * eg：
 * formatStr('Hello {language}', { language: 'JavaScript' }) => Hello JavaScript
 * formatStr('{0} is the best {1} of this {2}', ['JavaScript', 'language', 'world']) => JavaScript is the best language of this world
 */
export function formatStr (str = '', params) {
  if (isEmpty(params)) {
    return str
  }
  if (getValueType(params) === 'Object') {
    for (const key of Object.keys(params)) {
      str = str.replace(new RegExp(`{${key}}`, 'g'), params[key])
    }
    return str
  }
  if (getValueType(params) === 'Array') {
    for (let i = 0, len = params.length; i < len; i++) {
      str = str.replace(new RegExp(`{${i}}`, 'g'), params[i])
    }
    return str
  }
  return str
}

/* base64转码 */
export function base64Encode (content) {
  return Buffer.from(content).toString('base64')
}

/* base64解码 */
export function base64Decode (base64) {
  return Buffer.from(base64.replace(/\s/g, '+'), 'base64').toString()
}
