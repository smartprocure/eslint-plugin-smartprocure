/* eslint-env jest */

let { RuleTester } = require("eslint");
let _ = require("lodash/fp");
let rule = require("./prefer-lodash-fp-method");

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
  },
});

let ruleTester = new RuleTester();

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
  _.lastIndexOf(x, y)`,
];

let invalidCode = [
  { input: "y.map(x)", method: "map", output: "y.map(x)" },
  { input: "y.includes(x)", method: "includes", output: "y.includes(x)" },
  { input: "y.sort(x)", method: "sort", output: "y.sort(x)" },
  { input: "y.every(x)", method: "every", output: "y.every(x)" },
  { input: "y.filter(x)", method: "filter", output: "y.filter(x)" },
  { input: "y.find(x)", method: "find", output: "y.find(x)" },
  { input: "y.forEach(x)", method: "forEach", output: "y.forEach(x)" },
  { input: "y.indexOf(x)", method: "indexOf", output: "y.indexOf(x)" },
  { input: "y.join(x)", method: "join", output: "y.join(x)" },
  {
    input: "y.reduceRight(x)",
    method: "reduceRight",
    output: "y.reduceRight(x)",
  },
  { input: "y.reverse(x)", method: "reverse", output: "y.reverse(x)" },
  { input: "y.slice(x)", method: "slice", output: "y.slice(x)" },
  { input: "y.some(x)", method: "some", output: "y.some(x)" },
  { input: "y.sort(x)", method: "sort", output: "y.sort(x)" },
  {
    input: "y.lastIndexOf(x)",
    method: "lastIndexOf",
    output: "y.lastIndexOf(x)",
  },
  { input: "y.map(x => 1)", method: "map", output: "_.map(x => 1, y)" },
  { input: "y.map((x, y) => 1)", method: "map", output: "y.map((x, y) => 1)" },
  {
    input: "y.map(function(x) { return 1 })",
    method: "map",
    output: "_.map(function(x) { return 1 }, y)",
  },
  {
    input: "y.map(function(x, y) { return 1 })",
    method: "map",
    output: "y.map(function(x, y) { return 1 })",
  },
  {
    input: "y.reduce(function(x, i) { return x + i }, z)",
    method: "reduce",
    output: "_.reduce(function(x, i) { return x + i }, z, y)",
  },
  {
    input: "[].reduce(function(x, i) { return x + i }, z)",
    method: "reduce",
    output: "_.reduce(function(x, i) { return x + i }, z, [])",
  },
  {
    input: "[].some(x => x === y)",
    method: "some",
    output: "_.some(x => x === y, [])",
  },
];

ruleTester.run("prefer-lodash-fp-methods", rule, {
  valid: _.map((code) => ({ code }), validCode),
  invalid: _.map(
    ({ input, method, output }) => ({
      code: input,
      errors: [
        {
          message: `Use the lodash alternative for ${method}`,
        },
      ],
      output,
    }),
    invalidCode
  ),
});
