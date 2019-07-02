/* 正则 */
const patterns = {
  number: /^[0-9]*$/, /* 纯数字 */
  integer: /^(-?[1-9]*[1-9][0-9]*|0)$/, /* 可带减号，非0开头的整数 */
  float: /^((-?[1-9]+(\.\d+)?)|(-?0\.\d+)|0)$/, /* 浮点数，可带减号，过滤“0n.”、“-0n.”、“00.”、“-00.”、“-0”非法格式  /^-?([1-9]+|0)(\.\d+)?$/ */
  username: /^\w+$/, /* 数字、英文字母或者下划线 */
  passwordS: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, /* 密码-强（字母+数字+特殊字符） */
  passwordM: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, /* 密码-中（字母+数字，字母+特殊字符，数字+特殊字符） */
  passwordW: /^\w+$/, /* 密码-弱（数字，字母，下划线） */
  idCardCode: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, /* 身份证校验码 */
  idCardDate: /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/, /* 身份证日期码 */
  idCardProv: /^[1-9][0-9]/, /* 身份证地区码 */
  mobileNo: /^1([34578])\d{9}$/, /* 手机号码 */
  telNo: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, /* 固定电话、传真 */
  email: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, /* 邮箱 */
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/,
  qqNo: /^[1-9][0-9]{4,10}$/, /* qq号 5至11位数字*/
  wxNo: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, /* 微信号 6至20位，以字母开头，字母，数字，减号，下划线*/
  cCarNo: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/, /* 普通汽车 */
  xCarNo: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/ /* 新能源汽车 */
}

/* 验证纯数字 */
function isNumber (value, name) {
  const valid = patterns.number.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '该项'}只能输入数字`)
  }
}

/* 验证整数 */
function isInteger (value, name, options) {
  options = Object.assign({ min: null, max: null, include: true }, options)
  let valid = patterns.integer.test(value)
  let message = `${name || '该项'}只能输入有效整数`
  const minValid = typeof options.min === 'number' && !isNaN(options.min)
  const maxValid = typeof options.max === 'number' && !isNaN(options.max)
  if (valid && (minValid || maxValid)) {
    value = parseInt(value)
    if (minValid && maxValid) {
      valid = options.include ? options.min <= value && value <= options.max : options.min < value && value < options.max
      message = `${name || '该项'}必须大于${options.include ? '等于' : ''} ${options.min} 且小于${options.include ? '等于' : ''} ${options.max}`
    } else if (minValid && !maxValid) {
      valid = options.include ? options.min <= value : options.min < value
      message = `${name || '该项'}必须大于${options.include ? '或等于' : ''} ${options.min}`
    } else if (!minValid && maxValid) {
      valid = options.include ? value <= options.max : value < options.max
      message = `${name || '该项'}必须小于${options.include ? '或等于' : ''} ${options.max}`
    }
  }
  return {
    valid,
    error: valid ? null : new Error(message)
  }
}

/* 验证浮点数 */
function isFloat (value, name, options) {
  options = Object.assign({ min: null, max: null, include: true }, options)
  let valid = patterns.float.test(value)
  let message = `${name || '该项'}只能输入有效浮点数`
  const minValid = typeof options.min === 'number' && !isNaN(options.min)
  const maxValid = typeof options.max === 'number' && !isNaN(options.max)
  if (valid && (minValid || maxValid)) {
    value = parseFloat(value)
    if (minValid && maxValid) {
      valid = options.include ? options.min <= value && value <= options.max : options.min < value && value < options.max
      message = `${name || '该项'}必须大于${options.include ? '等于' : ''} ${options.min} 且小于${options.include ? '等于' : ''} ${options.max}`
    } else if (minValid && !maxValid) {
      valid = options.include ? options.min <= value : options.min < value
      message = `${name || '该项'}必须大于${options.include ? '或等于' : ''} ${options.min}`
    } else if (!minValid && maxValid) {
      valid = options.include ? value <= options.max : value < options.max
      message = `${name || '该项'}必须小于${options.include ? '或等于' : ''} ${options.max}`
    }
  }
  return {
    valid,
    error: valid ? null : new Error(message)
  }
}

/* 用户名 */
function username (value, name) {
  const valid = patterns.username.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '用户名'}只能由数字、英文字母或者下划线组成`)
  }
}

/* 密码 */
function password (value, name, options) {
  options = Object.assign({ intensity: 'W' }, options)
  if (!require && !value) {
    return { valid: true }
  }
  const valid = patterns[`password${options.intensity}`].test(value)
  const tips = options.intensity === 'S' ? '必须由字母、数字和特殊字符组成' : options.intensity === 'M' ? '必须包含字母、数字、特殊字符中2种字符' : '只能由数字、字母、下划线组成'
  return {
    valid,
    error: valid ? null : new Error(`${name || '密码'}${tips}`)
  }
}

/* 身份证格式校验 */
function idCardNo (value, name) {
  /* 检验身份证校验码 */
  function _checkCode (val) {
    const factor = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']
    const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    const code = val.substring(17)
    if (patterns.idCardCode.test(val)) {
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
    if (patterns.idCardDate.test(val)) {
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
    if (patterns.idCardProv.test(val)) {
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
}

/* 手机号码 */
function mobileNo (value, name) {
  const valid = patterns.mobileNo.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '手机号码'}格式错误`)
  }
}

/* 座机、传真 */
function telNo (value, name) {
  const valid = patterns.telNo.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '号码'}格式错误`)
  }
}

/* 联系方式 */
function contactNo (value, name) {
  const valid = patterns.mobileNo.test(value) || patterns.telNo.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '号码'}格式错误`)
  }
}

/* email */
function email (value, name) {
  const valid = patterns.email.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '邮箱'}格式错误`)
  }
}

/* url */
function url (value, name) {
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
  const valid = patterns.url.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || 'Url'}格式错误`)
  }
}

/* qq */
function qqNo (value, name) {
  const valid = patterns.qqNo.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || 'QQ号'}格式错误`)
  }
}

/* 微信号*/
function wxNo (value, name) {
  const valid = patterns.wxNo.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '微信号'}格式错误`)
  }
}

/* 车牌号 */
function carNo (value, name) {
  const valid = patterns.cCarNo.test(value) || patterns.xCarNo.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '车牌号'}格式错误`)
  }
}

/* 类型表 */
const validateTypes = {
  isNumber,
  isInteger,
  isFloat,
  username,
  password,
  idCardNo,
  mobileNo,
  telNo,
  contactNo,
  email,
  url,
  qqNo,
  wxNo,
  carNo
}

/* 验证器 */
function validator (type, name = '', options) {
  options = Object.assign({ require: false }, options)
  return (rule, value, callback) => {
    if (!value) {
      if (options.require) {
        callback(new Error(`${name || '该项'}为必填项`))
      } else {
        callback()
      }
      return
    }
    const res = validateTypes[type](value, name, options)
    res.valid ? callback() : callback(res.error)
  }
}

export default validator
