const Mock = require('mockjs')
let id = Mock.mock('@id')

let obj = Mock.mock({
  id: '@id()',
  name: '@cname()',
  advance: '@cname()',
  lag: '@cname()',
  complete: '@cname()',
  total: '@cname()',
  percentage: '@cname()',
})
console.log(obj)