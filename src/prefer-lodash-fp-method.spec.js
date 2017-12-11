/* eslint-env jest */

let { RuleTester } = require('eslint')
let rule = require('./no-lodash-constant')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6
  }
})

let ruleTester = new RuleTester()

let validCode = [
  `let _ = require('lodash/fp')
  _.map(x => x, [])`,
  `let bob = require('lodash/fp')
  bob.map(x => x, [])`,
  `let _ = require('lodash/fp')
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
  valid: validCode.map(code => ({ code })),
  invalid: invalidCode.map(({ code, method }) => ({
    code,
    errors: [
      {
        message: `Use _.${method}`
      }
    ]
  }))
})
