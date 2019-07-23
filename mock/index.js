const Mock = require('mockjs')

const user = require('./user')
const staff = require('./staff')
const validate = require('./validate')
const tree = require('./tree')

const mocks = [...user, ...staff, ...validate, ...tree]

const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response (req, res) {
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      )
    }
  }
}

module.exports = mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
