module.exports = {
  /**
   * It will pick the env config based on the SAILS_ENV value. If a project has SAILS_ENV
   * defined to some value then it expects that same file in the env/config file so that it
   * will pick the config value from that file.
   *
   * @param defaultConfig this is the default config which is bases on NODE_ENV value
   * @returns {config}
   *
   *
   * @example
   * // This is the env config file
   * module.exports = require('sails-env-switch').switch({
   *    port: 8080,
   *    name: 'Sample'
   * });
   *
   * // if process.env.SAILS_ENV is there and its value is set to internal, then it will pick
   * // config from env/internal.js file so if env/internal.js file contains port=5050 and name="foo' then it
   * // will return: {
   * //    port: 5050,
   * //    name: 'foo'
   * // }
   *
   * // if process.env.SAILS_ENV is there and its value is set to internal, then it will pick
   * // config from env/internal.js file so if env/internal.js file contains port=5050 and foo='bar' then it
   * // will return: {
   * //    port: 5050,
   * //    foo: 'bar'
   * // }
   *
   * // Here NODE_ENV will not be disturbed at all just the config will be picked based on SAILS_ENV
   *
   */
  switch: function (defaultConfig) {
    return process.env.SAILS_ENV ? require(process.cwd() + '/config/env/' + process.env.SAILS_ENV) : defaultConfig;
  }
};
