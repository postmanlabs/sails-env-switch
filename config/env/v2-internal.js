/**
 * @fileOverview This is a variation of a SailsJS local.js file that uses env-lift to provide configuration overrides
 * from environment variables.
 */
module.exports = require('../../index').switchV2(__filename, {
  port: 6060,

  environment: 'v2-internal',

  log: {
    level: 'silly'
  },

  foo: {
    bar: 'v2-dummy'
  }
});
