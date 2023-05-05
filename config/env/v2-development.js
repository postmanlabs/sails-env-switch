/**
 * @fileOverview This is a variation of a SailsJS local.js file that uses env-lift to provide configuration overrides
 * from environment variables.
 */
module.exports = require('../../index').switchV2({
  port: 1337,

  environment: 'development',

  models: {
    connection: 'mySQL',
    migrate: 'safe'
  },

  log: {
    level: 'info'
  }
});
