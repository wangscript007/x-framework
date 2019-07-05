import { getValueType, isNumber } from './index'

/* 正则 */
const PATTERNS = {
  NUMBER: /^[0-9]*$/, /* 纯数字 */
  INTEGER: /^(-?[1-9]*[1-9][0-9]*|0)$/, /* 可带减号，非0开头的整数 */
  FLOAT: /^((-?[1-9]+(\.\d+)?)|(-?0\.\d+)|0)$/, /* 浮点数，可带减号，过滤“0n.”、“-0n.”、“00.”、“-00.”、“-0”非法格式  /^-?([1-9]+|0)(\.\d+)?$/ */
  USERNAME: /^\w+$/, /* 数字、英文字母或者下划线 */
  PASSWORD_S: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, /* 密码-强（字母+数字+特殊字符） */
  PASSWORD_M: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, /* 密码-中（字母+数字，字母+特殊字符，数字+特殊字符） */
  PASSWORD_W: /^\w+$/, /* 密码-弱（数字，字母，下划线） */
  ID_CODE: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, /* 身份证校验码 */
  ID_DATE: /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/, /* 身份证日期码 */
  ID_PROV: /^[1-9][0-9]/, /* 身份证地区码 */
  MOBILE: /^1([34578])\d{9}$/, /* 手机号码 */
  TEL: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, /* 固定电话、传真 */
  EMAIL: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, /* 邮箱 */
  URL: /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/,
  QQ: /^[1-9][0-9]{4,10}$/, /* qq号 5至11位数字*/
  WECHAT: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, /* 微信号 6至20位，以字母开头，字母，数字，减号，下划线*/
  CAR_N: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/, /* 普通汽车 */
  CAR_E: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/ /* 新能源汽车 */
}

const validators = {
  /* 非空 */
  require (value, name) {
    const valueType = getValueType(value)
    const valid = !(valueType === 'Null' || valueType === 'Undefined' || (valueType === 'String' && value === ''))
    return {
      valid,
      error: valid ? null : new Error(`${name || '该项'}为必填项`)
    }
  },
  /* 验证纯数字 */
  number (value, name) {
    const valid = PATTERNS.NUMBER.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '该项'}只能输入数字`)
    }
  },
  /* 整数 */
  integer (value, name, options) {
    const valid = PATTERNS.INTEGER.test(value)
    if (!valid) {
      return { valid: false, error: new Error(`${name || '该项'}只能输入有效整数`) }
    }
    options = Object.assign({ min: null, max: null, include: true }, options)
    const { min, max } = options
    if (isNumber(min) || isNumber(max)) {
      this.range(parseInt(value), name, options)
      return
    }
    return { valid: true, error: null }
  },
  /* 浮点数 */
  float (value, name, options) {
    const valid = PATTERNS.FLOAT.test(value)
    if (!valid) {
      return { valid: false, error: new Error(`${name || '该项'}只能输入有效浮点数`) }
    }
    options = Object.assign({ min: null, max: null, include: true }, options)
    const { min, max } = options
    if (isNumber(min) || isNumber(max)) {
      this.range(parseFloat(value), name, options)
      return
    }
    return { valid: true, error: null }
  },
  /* 范围 */
  range (value, name, options) {
    const { min, max, include } = Object.assign({ min: null, max: null, include: true }, options)
    const minValid = isNumber(min)
    const maxValid = isNumber(max)
    if (!minValid && !maxValid) {
      return { valid: true, error: null }
    }
    let valid = false
    let message = ''
    if (minValid && maxValid) {
      valid = include ? min <= value && value <= max : min < value && value < max
      message = `${name || '该项'}必须大于${include ? '等于' : ''} ${min} 且小于${include ? '等于' : ''} ${max}`
      return { valid, error: valid ? null : new Error(message) }
    }
    valid = minValid ? (include ? min <= value : min < value) : (include ? value <= max : value < max)
    message = `${name || '该项'}必须${minValid ? '大' : '小'}于${include ? '或等于' : ''} ${minValid ? min : max}`
    return { valid, error: valid ? null : new Error(message) }
  },
  /* 用户名 */
  username (value, name) {
    const valid = PATTERNS.USERNAME.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '用户名'}只能由数字、英文字母或者下划线组成`)
    }
  },
  /* 密码 */
  password (value, name, options) {
    options = Object.assign({ intensity: 'W' }, options)
    if (!require && !value) {
      return { valid: true }
    }
    const valid = PATTERNS[`PASSWORD_${options.intensity}`].test(value)
    const tips = options.intensity === 'S' ? '必须由字母、数字和特殊字符组成' : options.intensity === 'M' ? '必须包含字母、数字、特殊字符中2种字符' : '只能由数字、字母、下划线组成'
    return {
      valid,
      error: valid ? null : new Error(`${name || '密码'}${tips}`)
    }
  },
  /* 身份证 */
  id (value, name) {
    /* 检验身份证校验码 */
    function _checkCode (val) {
      const factor = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']
      const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      const code = val.substring(17)
      if (PATTERNS.ID_CODE.test(val)) {
        let sum = 0
        for (let i = 0; i < 17; i++) {
          sum += val[i] * factor[i]
        }
        if (parity[sum % 11] === code.toUpperCase()) {
          return true
        }
      }
      return false
    }
    /* 检验身份证日期码 */
    function _checkBirthday (val) {
      if (PATTERNS.ID_DATE.test(val)) {
        const year = val.substring(0, 4)
        const month = val.substring(4, 6)
        const date = val.substring(6, 8)
        const date2 = new Date(`${year}-${month}-${date}`)
        if (date2 && date2.getMonth() === (parseInt(month) - 1)) {
          return true
        }
      }
      return false
    }
    /* 检验身份证地区码 */
    function _checkProvince (val) {
      const provinceMap = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门'
      }
      if (PATTERNS.ID_PROV.test(val)) {
        if (provinceMap[val]) {
          return true
        }
      }
      return false
    }
    /* 验证 */
    const valid = _checkCode(value) && _checkBirthday(value.substring(6, 14)) && _checkProvince(value.substring(0, 2))
    return {
      valid,
      error: valid ? null : new Error(`${name || '身份证号码'}格式错误`)
    }
  },
  /* 座机、传真 */
  tel (value, name) {
    const valid = PATTERNS.TEL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '号码'}格式错误`)
    }
  },
  /* 联系方式 */
  contact (value, name) {
    const valid = PATTERNS.MOBILE.test(value) || PATTERNS.TEL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '号码'}格式错误`)
    }
  },
  /* email */
  email (value, name) {
    const valid = PATTERNS.EMAIL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '邮箱'}格式错误`)
    }
  },
  /* url */
  url (value, name) {
    // const strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
    //   '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' + /* ftp的user@ */
    //   '(([0-9]{1,3}.){3}[0-9]{1,3}' + /* IP形式的URL- 199.194.52.184 */
    //   '|' + /* 允许IP和DOMAIN（域名）*/
    //   '([0-9a-z_!~*\'()-]+.)*' + /* 域名- www.*/
    //   '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + /* 二级域名 */
    //   '[a-z]{2,6})' + /* 一级domain- .com 或 .museum */
    //   '(:[0-9]{1,4})?' + /* 端口- :80  */
    //   '((/?)|' + /* a slash isn't required if there is no file name */
    //   '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
    const valid = PATTERNS.URL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || 'Url'}格式错误`)
    }
  },
  /* qq */
  qq (value, name) {
    const valid = PATTERNS.QQ.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || 'QQ号'}格式错误`)
    }
  },
  /* 微信号 */
  wechat (value, name) {
    const valid = PATTERNS.WECHAT.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '微信号'}格式错误`)
    }
  },
  /* 车牌号 */
  car (value, name) {
    const valid = PATTERNS.CAR_N.test(value) || PATTERNS.CAR_E.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '车牌号'}格式错误`)
    }
  }
}

/* 验证器 */
// function extendValidator (type, name = '', options) {
//   options = Object.assign({ require: false }, options)
//   return (rule, value, callback) => {
//     if (!value) {
//       if (options.require) {
//         callback(new Error(`${name || '该项'}为必填项`))
//       } else {
//         callback()
//       }
//       return
//     }
//     const res = validateTypes[type](value, name, options)
//     res.valid ? callback() : callback(res.error)
//   }
// }

/*
* [
*   {
*     type: '', require、date、array、extend-validator
*     name: '',
*     options: {
*       min：
*       max:
*       include:
*     }
*   }
* ]
*/

/*
*  如果参数是array类型，则返回一组验证器定义对象array
*  如果参数是一个object类型，则返回一个验证器对象
* */

function validator (param) {
  const createValidator = function (object) {
    if (!object || !object.type) {
      return
    }
    /* 两种处理方式 */
    /* 一、包含在扩展验证中的，使用扩展验证 */
    /* 二、非包含在扩展验证中的，使用element验证 */
  }

  /* 参数为object类型，返回验证器定义对象 */
  if (Object.prototype.toString.call(param) === '[Object Object]') {

  }

  /* 参数为array类型，返回验证器定义对象array */
  if (Array.isArray(param)) {

  }

  return {}
}

export default validator
