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
  _.map(x => x, [])`,
  `let _ = require('lodash/fp');
  _.includes('cheese', ['cheese'])`
]

let invalidCode = [
  {
    code: `[].map(x => x)`,
    method: 'map'
  },
  {
    code: `['cheese'].includes('cheese')`,
    method: 'includes'
  }
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
