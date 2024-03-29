/* eslint-env jest */
let _ = require('lodash/fp')

let { RuleTester } = require('eslint')
let rule = require('./no-lodash-constant')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6
  }
})

let ruleTester = new RuleTester()

let validCode = [
  '() => { return \'\'; }',
  '() => \'\'',
  '(function() { return \'\'; })',
  'function foo() { return \'\'; }'
]
let invalidCode = [
  { input: '_.constant(\'\')', output: '() => \'\'' },
  { input: '_.constant(\'{}\')', output: '() => \'{}\'' },
  { input: '_.constant(1)', output: '() => 1' },
  { input: '_.constant(true)', output: '() => true' },
  { input: '_.constant({})', output: '() => ({})' },
  {
    input: 'var foo = {}; _.constant(foo)',
    output: 'var foo = {}; () => foo'
  }
]

ruleTester.run('no-lodash-constant', rule, {
  valid: _.map(code => ({ code }), validCode),
  invalid: _.map(
    ({ input, output }) => ({
      code: input,
      errors: [
        {
          message: 'Do not use _.constant'
        }
      ],
      output
    }),
    invalidCode
  )
})
