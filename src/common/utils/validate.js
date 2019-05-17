/* 用户名 */
function username (value, name) {
  const valid = /^\w+$/.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '用户名'}只能由数字、英文字母或者下划线组成`)
  }
}

/* 检验身份证校验码 */
function _checkCode (val) {
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  const factor = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']
  const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  const code = val.substring(17)
  if (p.test(val)) {
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
  const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
  if (pattern.test(val)) {
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
  const pattern = /^[1-9][0-9]/
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

  if (pattern.test(val)) {
    if (provinceMap[val]) {
      return true
    }
  }
  return false
}

/* 身份证格式校验 */
function idCardNo (value, name) {
  const valid = _checkCode(value) && _checkBirthday(value.substring(6, 14)) && _checkProvince(value.substring(0, 2))
  return {
    valid,
    error: valid ? null : new Error(`${name || '身份证号码'}格式错误`)
  }
}

/* 手机号码 */
function phoneNo (value, name) {
  const valid = /^1([34578])\d{9}$/.test(value)
  return {
    valid,
    error: valid ? null : new Error(`${name || '手机号码'}格式错误`)
  }
}

function handler (type) {
  return (rule, value, callback) => {
    const res = validateUtil[type](value)
    !res.valid ? callback(res.error) : callback()
  }
}

const validateUtil = {
  username,
  idCardNo,
  phoneNo,
  handler
}

export default validateUtil

