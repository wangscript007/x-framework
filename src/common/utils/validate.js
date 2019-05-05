function isEmpty (value, name) {
  const res = {
    valid: true,
    error: null
  }
  if (typeof value === 'boolean') {
    res.valid = true
    return false
  } else if (value instanceof Array) {
    res.valid = value.length !== 0
  } else if (value instanceof Object) {
    res.valid = JSON.stringify(value) !== '{}'
  } else {
    res.valid = value !== 'null' && value != null && value !== undefined && value !== ''
  }
  if (!res.valid) {
    res.error = new Error(`${name || '字段'}不能为空`)
  }
  return res
}

function username (value) {
  return {
    valid: /^\w+$/.test(value),
    error: new Error(`用户名只能由数字、英文字母或者下划线组成`)
  }
}

const validateUtil = {
  isEmpty,
  username
}

export default validateUtil

