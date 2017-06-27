var path = require('path');

module.exports = {
  /**
   * It will pick the env config based on the SAILS_ENV value. If a project has SAILS_ENV
   * defined to some value then it expects that same file in the env/config file so that it
   * will pick the config value from that file.
   *
   * @param env this is the current sails environment in which this module is used.
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
    // If SAILS_ENV is not defined, return the default config
    if (!process.env.SAILS_ENV) {
        return defaultConfig;
    }

    // Get the file name from which config will be loaded.
    var targetFile = require.resolve(path.join(process.cwd(), 'config', 'env', process.env.SAILS_ENV));

    // if the parent file name from which this module is called is same as the targetFile name then no need
    // to require the targetFile as we are already at the target File and we need that file's config.
    //
    // So lets say SAILS_ENV is set to internal and we get the targetFile as /internal.js
    // If the current file from which this file is called is internal.js, then return the config of that file.
    if (path.relative(targetFile, module.parent.filename) === '') {
      return defaultConfig;
    }

    // Cache for this file has to be cleared as this hook depends on the parent module from which this has been
    // called and that is dynamic, so we need to make sure we are requiring the correct parent file everytime.
    delete require.cache[__filename];

    // Finally return the target file's config.
    return require(targetFile);
  }
};
