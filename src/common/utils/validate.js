import { getValueType, getStrLength, isEmpty, isNumber } from './index'

/* 正则 */
const PATTERNS = {
  NUMBER: /^[0-9]*$/, /* 纯数字 */
  INTEGER: /^(-?[1-9]*[1-9][0-9]*|0)$/, /* 可带减号，非0开头的整数 */
  FLOAT: /^((-?[1-9]+[0-9]*(\.\d+)?)|(-?0\.\d+)|0)$/, /* 浮点数，可带减号，过滤“0n.”、“-0n.”、“00.”、“-00.”、“-0”非法格式  /^-?([1-9]+|0)(\.\d+)?$/ */
  USERNAME: /^\w+$/, /* 数字、英文字母或者下划线 */
  PASSWORD_H: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, /* 密码-强（字母+数字+特殊字符） */
  PASSWORD_M: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, /* 密码-中（字母+数字，字母+特殊字符，数字+特殊字符） */
  PASSWORD_L: /^\w+$/, /* 密码-弱（数字，字母，下划线） */
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

/* 默认触发方式 */
const DEFAULT_TRIGGER = 'change'

/* 验证器 */
const validators = {
  /*
   * 数字校验
   * options.min：最小长度
   * options.max：最大长度
   */
  number (value, name, options) {
    const { min, max } = Object.assign({ min: null, max: null }, options)
    if (!PATTERNS.NUMBER.test(value)) {
      return { valid: false, error: new Error(`${name || '该项'}只能输入数字`) }
    }
    if (isNumber(min) || isNumber(max)) {
      return this.length(value, name, { min, max })
    }
    return { valid: true, error: null }
  },
  /*
   * 字符串长度校验
   * options.min：最小长度
   * options.max：最大长度
   */
  length (value, name, options) {
    const { min, max } = Object.assign({ min: null, max: null }, options)
    const minEffective = isNumber(min)
    const maxEffective = isNumber(max)
    if (!minEffective && !maxEffective) {
      return { valid: true, error: null }
    }
    const valueLength = getStrLength(value)
    if (minEffective && maxEffective) {
      const valid = min <= valueLength && valueLength <= max
      return { valid, error: valid ? null : new Error(`${name || '该项'}的长度必须在 ${min} - ${max} 个字符之间`) }
    }
    const valid = minEffective ? (min <= valueLength) : (valueLength <= max)
    return { valid, error: valid ? null : new Error(`${name || '该项'}的长度必须${minEffective ? '大' : '小'}于或等于 ${minEffective ? min : max} 个字符`) }
  },
  /*
   * 整数校验
   * options.min：最小长度
   * options.max：最大长度
   * options.include：是否包含
   */
  integer (value, name, options) {
    const { min, max, include } = Object.assign({ min: null, max: null, include: true }, options)
    if (!PATTERNS.INTEGER.test(value)) {
      return { valid: false, error: new Error(`${name || '该项'}只能输入有效整数`) }
    }
    if (isNumber(min) || isNumber(max)) {
      return this.range(parseInt(value), name, { min, max, include })
    }
    return { valid: true, error: null }
  },
  /*
   * 浮点数校验
   * options.min：最小长度
   * options.max：最大长度
   * options.include：是否包含
   */
  float (value, name, options) {
    const { min, max, include } = Object.assign({ min: null, max: null, include: true }, options)
    if (!PATTERNS.FLOAT.test(value)) {
      return { valid: false, error: new Error(`${name || '该项'}只能输入有效浮点数`) }
    }
    if (isNumber(min) || isNumber(max)) {
      return this.range(parseFloat(value), name, { min, max, include })
    }
    return { valid: true, error: null }
  },
  /*
   * 数值大小校验
   * options.min：最小长度
   * options.max：最大长度
   * options.include：是否包含
   */
  range (value, name, options) {
    const { min, max, include } = Object.assign({ min: null, max: null, include: true }, options)
    const minEffective = isNumber(min)
    const maxEffective = isNumber(max)
    if (!minEffective && !maxEffective) {
      return { valid: true, error: null }
    }
    if (minEffective && maxEffective) {
      const valid = include ? min <= value && value <= max : min < value && value < max
      return {
        valid,
        error: valid ? null : new Error(`${name || '该项'}必须大于${include ? '等于' : ''} ${min} 且小于${include ? '等于' : ''} ${max}`)
      }
    }
    const valid = minEffective ? (include ? min <= value : min < value) : (include ? value <= max : value < max)
    return {
      valid,
      error: valid ? null : new Error(`${name || '该项'}必须${minEffective ? '大' : '小'}于${include ? '或等于' : ''} ${minEffective ? min : max}`)
    }
  },
  /*
   * 用户名校验
   * options.min：最小长度
   * options.max：最大长度
   */
  username (value, name, options) {
    const { min, max } = Object.assign({ min: null, max: null }, options)
    if (!PATTERNS.USERNAME.test(value)) {
      return { valid: false, error: new Error(`${name || '该项'}只能由数字、英文字母或者下划线组成`) }
    }
    if (isNumber(min) || isNumber(max)) {
      return this.length(value, name, { min, max })
    }
    return { valid: true, error: null }
  },
  /*
   * 密码校验
   * options.level：严格等级
   * options.min：最小长度
   * options.max：最大长度
   */
  password (value, name, options) {
    const { level, min, max } = Object.assign({ level: 'L', min: null, max: null }, options)
    const messages = {
      H: '必须由字母、数字和特殊字符组成',
      M: '必须包含字母、数字、特殊字符中2种字符',
      L: '只能由数字、字母、下划线组成'
    }
    if (!PATTERNS[`PASSWORD_${level}`].test(value)) {
      return { valid: false, error: new Error(`${name || '密码'}${messages[level]}`) }
    }
    if (isNumber(min) || isNumber(max)) {
      return this.length(value, name, { min, max })
    }
    return { valid: true, error: null }
  },
  /*
   * 身份证校验，中国大陆适用
   */
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
      return !!(PATTERNS.ID_PROV.test(val) && provinceMap[val])
    }

    /* 验证 */
    const valid = _checkCode(value) && _checkBirthday(value.substring(6, 14)) && _checkProvince(value.substring(0, 2))
    return {
      valid,
      error: valid ? null : new Error(`${name || '身份证号码'}格式错误`)
    }
  },
  /*
   * 手机号校验，中国大陆适用
   */
  mobile (value, name) {
    const valid = PATTERNS.MOBILE.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '手机号码'}格式错误`)
    }
  },
  /*
   * 座机、传真校验
   */
  tel (value, name) {
    const valid = PATTERNS.TEL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '号码'}格式错误`)
    }
  },
  /*
   * 联系方式校验，包含mobile和tel
   */
  contact (value, name) {
    const valid = PATTERNS.MOBILE.test(value) || PATTERNS.TEL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '号码'}格式错误`)
    }
  },
  /*
   * email校验
   */
  email (value, name) {
    const valid = PATTERNS.EMAIL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '邮箱'}格式错误`)
    }
  },
  /*
   * url校验
   */
  url (value, name) {
    const valid = PATTERNS.URL.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || 'Url'}格式错误`)
    }
  },
  /*
   * qq号码校验
   */
  qq (value, name) {
    const valid = PATTERNS.QQ.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || 'QQ号'}格式错误`)
    }
  },
  /*
   * 微信号码校验
   */
  wechat (value, name) {
    const valid = PATTERNS.WECHAT.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '微信号'}格式错误`)
    }
  },
  /*
   * 车牌号校验，中国大陆适用
   */
  car (value, name) {
    const valid = PATTERNS.CAR_N.test(value) || PATTERNS.CAR_E.test(value)
    return {
      valid,
      error: valid ? null : new Error(`${name || '车牌号'}格式错误`)
    }
  }
}

function validatorOptionsFilter (validator, keys = []) {
  if (!keys.length) {
    return validator
  }
  const options = {}
  const validatorOptionKeys = Object.keys(validator)
  for (const key of validatorOptionKeys) {
    if (!keys.includes(key)) {
      options[key] = validator[key]
    }
  }
  return options
}

/* 创建验证器对象 */
function createValidator (validator, name) {
  const result = []
  if (!validator) {
    return result
  }
  const { required, type, trigger } = Object.assign({ required: false, trigger: DEFAULT_TRIGGER }, validator)
  const validatorKeys = Object.keys(validators)
  /* 如果required为true，则必须为验证器生成一个element原生的required验证器 */
  if (required) {
    result.push({ required: true, message: `${name || '该项'}为必填项`, trigger: trigger || DEFAULT_TRIGGER })
  }
  /* 如果type存在，且类型在扩展验证器中，则根据type参数生成扩展验证器 */
  if (type && validatorKeys.includes(type)) {
    result.push({
      validator: (rule, value, callback) => {
        if (!required && isEmpty(value)) {
          callback()
        }
        const res = validators[type](value, name, validatorOptionsFilter(validator, ['type', 'trigger', 'required']))
        res.valid ? callback() : callback(res.error)
      },
      trigger
    })
  }
  /* type不存在且非require或者type存在且类型不属于扩展验证器，则以element原生验证器处理 */
  if (type && !validatorKeys.includes(type) || !type && !required) {
    result.push(Object.assign({ message: '', trigger }, validatorOptionsFilter(validator, ['required'])))
  }
  return result
}

/*
* 返回相应验证器
* validator：                                 验证器定义参数
*                                             当值为Object类型时，返回单个object类型的验证器
*                                             当值为Array类型时，返回array类型的多个验证器
* validator.type:                             验证器类型
* validator.required:                          是否必填
* validator.min:                              最小长度/最小值
* validator.max:                              最大长度/最大值
* validator.include：                         设置最大值或最小值时，是否以包含来验证
* validator.level：                           等级，password验证器专用
* validator.trigger：                         验证触发器
*
* name:                                       用于提示的字段名
*/
function validator (validator, name = '') {
  /* 参数为object类型，返回验证器定义对象 */
  if (getValueType(validator) === 'Object') {
    return createValidator(validator, name)
  }
  /* 参数为array类型，返回验证器定义对象array */
  if (getValueType(validator) === 'Array') {
    if (!validator.length) {
      return null
    }
    if (validator.length === 1) {
      return createValidator(validator[0], name)
    }
    const validators = []
    for (const options of validator) {
      validators.push(createValidator(options, name))
    }
    return validators
  }
  return null
}

export default validator
