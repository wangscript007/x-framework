export default class CommonException {
  constructor ({ message = '', code = 0 }) {
    this.message = message
    this.code = code
  }
}
