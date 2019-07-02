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

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  const _arr = arr.slice()
  for (let i = 0, len = _arr.length; i < len; i++) {
    const j = getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
