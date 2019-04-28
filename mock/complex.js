const Mock = require('mockjs')

const userList = []
const count = 100

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    userId: '@increment'
  }))
}
