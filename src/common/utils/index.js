import screen from '@/common/constants/screen'

const { body } = document
const RATIO = 3

export function getScreenSize () {
  const width = body.getBoundingClientRect().width - RATIO
  const matched = Object.values(screen).find((item) => {
    return item.maxSize ? item.minSize <= width && width <= item.maxSize : item.minSize <= width
  })
  return matched ? matched.name : ''
}

export function hasScrollBar () {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}

export function getScrollbarWidth () {
  var scrollDiv = document.createElement('div')
  scrollDiv.style.cssText = 'width:99px;height:99px;overflow:scroll;position:absolute;top:-9999px;opacity:0;'
  document.body.appendChild(scrollDiv)
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

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

export function getStrLength (str = '') {
  return isEmpty(str) ? 0 : str.replace(/[\u0391-\uFFE5]/g, 'aa').length
}

export function getValueType (value) {
  try {
    const typeStr = Object.prototype.toString.call(value)
    return typeStr.replace(/(.*)\[object (.*)]/g, '$1$2')
  } catch (e) {
    return 'Undefined'
  }
}

export function isNumber (value) {
  return getValueType(value) === 'Number' && !isNaN(value)
}

export function isEmpty (value) {
  if (typeof value === 'boolean') {
    return false
  }
  if (value instanceof Array && value.length === 0 || value instanceof Object && JSON.stringify(value) === '{}') {
    return true
  }
  return value === 'null' || value == null || value === 'undefined' || value === undefined || value === ''
}

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
    for (const param of params) {
      str = str.replace(new RegExp(`{${param}}`, 'g'), param)
    }
    return str
  }
  return str
}
