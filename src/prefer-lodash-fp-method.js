let _ = require('lodash/fp')

let bannedMethods = ['map', 'reduce', 'concat', 'includes']

module.exports = {
  create: ctx => ({
    MemberExpression(node) {
      let method = _.get('property.name', node)
      let fromLodash =
        _.get('object.type', node) === 'Identifier' &&
        _.get('object.name', node) === '_'
      if (!fromLodash && _.includes(method, bannedMethods)) {
        ctx.report({
          node,
          message: `Use the lodash alternative for ${method}`
        })
      }
    }
  })
}
