/* eslint-env jest */

let { RuleTester } = require('eslint')
let _ = require('lodash/fp')
let rule = require('./prefer-lodash-fp-method')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6
  }
})

let ruleTester = new RuleTester()

let validCode = [
  `let _ = require('lodash/fp');
  _.map(x, y)`,
  `let _ = require('lodash/fp');
  _.includes(x, y)`,
  `let _ = require('lodash/fp');
  _.sort(x, y)`,
  `let _ = require('lodash/fp');
  _.every(x, y)`,
  `let _ = require('lodash/fp');
  _.filter(x, y)`,
  `let _ = require('lodash/fp');
  _.find(x, y)`,
  `let _ = require('lodash/fp');
  _.forEach(x, y)`,
  `let _ = require('lodash/fp');
  _.indexOf(x, y)`,
  `let _ = require('lodash/fp');
  _.join(x, y)`,
  `let _ = require('lodash/fp');
  _.reduceRight(x, y)`,
  `let _ = require('lodash/fp');
  _.reverse(x, y)`,
  `let _ = require('lodash/fp');
  _.slice(x, y)`,
  `let _ = require('lodash/fp');
  _.some(x, y)`,
  `let _ = require('lodash/fp');
  _.sort(x, y)`,
  `let _ = require('lodash/fp');
  _.lastIndexOf(x, y)`
]

let invalidCode = [
  { code: `y.map(x)`, method: 'map' },
  { code: `y.includes(x)`, method: 'includes' },
  { code: `y.sort(x)`, method: 'sort' },
  { code: `y.every(x)`, method: 'every' },
  { code: `y.filter(x)`, method: 'filter' },
  { code: `y.find(x)`, method: 'find' },
  { code: `y.forEach(x)`, method: 'forEach' },
  { code: `y.indexOf(x)`, method: 'indexOf' },
  { code: `y.join(x)`, method: 'join' },
  { code: `y.reduceRight(x)`, method: 'reduceRight' },
  { code: `y.reverse(x)`, method: 'reverse' },
  { code: `y.slice(x)`, method: 'slice' },
  { code: `y.some(x)`, method: 'some' },
  { code: `y.sort(x)`, method: 'sort' },
  { code: `y.lastIndexOf(x)`, method: 'lastIndexOf' }
]

ruleTester.run('prefer-lodash-fp-methods', rule, {
  valid: _.map(code => ({ code }), validCode),
  invalid: _.map(
    ({ code, method }) => ({
      code,
      errors: [
        {
          message: `Use the lodash alternative for ${method}`
        }
      ]
    }),
    invalidCode
  )
})
