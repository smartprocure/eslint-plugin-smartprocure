let _ = require('lodash/fp')

let bannedMethods = {
  map: {
    iteratorArity: 1,
    arity: 1
  },
  reduce: {
    iteratorArity: 2,
    arity: 3
  },
  concat: {
    iteratorArity: 1,
    arity: 1
  },
  includes: {
    iteratorArity: 1,
    arity: 1
  },
  sort: {
    iteratorArity: 1,
    arity: 1
  },
  every: {
    iteratorArity: 1,
    arity: 1
  },
  filter: {
    iteratorArity: 1,
    arity: 1
  },
  find: {
    iteratorArity: 1,
    arity: 1
  },
  forEach: {
    iteratorArity: 1,
    arity: 1
  },
  indexOf: {
    iteratorArity: 1,
    arity: 1
  },
  join: {
    iteratorArity: 1,
    arity: 1
  },
  reduceRight: {
    iteratorArity: 2,
    arity: 3
  },
  reverse: {
    iteratorArity: 1,
    arity: 1
  },
  slice: {
    iteratorArity: 1,
    arity: 1
  },
  some: {
    iteratorArity: 1,
    arity: 1
  },
  lastIndexOf: {
    iteratorArity: 1,
    arity: 1
  }
}

module.exports = {
  meta: {
    fixable: 'code'
  },
  create: ctx => ({
    MemberExpression (node) {
      let sourceCode = ctx.getSourceCode()
      let method = _.get('property.name', node)
      let fromLodash =
        _.get('object.type', node) === 'Identifier' &&
        _.get('object.name', node) === '_'
      if (!fromLodash && _.includes(method, Object.keys(bannedMethods))) {
        ctx.report({
          node,
          message: `Use the lodash alternative for ${method}`,
          fix (fixer) {
            let methodArgs = node.parent.arguments
            let wontFix = fixer.insertTextAfter(node, '')
            let firstMethodArg = methodArgs[0]
            let firstMethodArgType = firstMethodArg.type
            if (
              methodArgs.length > bannedMethods[method].arity ||
              (firstMethodArgType !== 'FunctionExpression' &&
                firstMethodArgType !== 'ArrowFunctionExpression') ||
              firstMethodArg.params.length > bannedMethods[method].iteratorArity
            ) {
              return wontFix
            }
            let parent = node.parent
            return fixer.replaceText(
              parent,
              `_.${method}(${_.join(
                ', ',
                _.map(n => sourceCode.getText(n), node.parent.arguments)
              )}, ${sourceCode.getText(node.object)})`
            )
          }
        })
      }
    }
  })
}
