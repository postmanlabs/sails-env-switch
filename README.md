# sails-env-switch

`sails-env-switch` provides a NodeJS module to load config based on the `SAILS_ENV` environment variable. This module
 makes is easy to switch environment based on `SAILS_ENV`. This module is to be used in sails to load configurations
 without having any performance issues, mainly in production (since NODE_ENV is still same). This module takes the
 default config and return the config based on `SAILS_ENV` value, if SAILS_ENV is not there it will return the
 default config.

# Installing sail-env-switch

The easiest way to install sails-env-switch is from NPM registry. Switch to your project directory and run the
following command. Once installation completes, refer to the usage guidelines or the `config/env` directory to us it
in your project.

```terminal
npm install sails-env-switch --save
```

## Usage

This module can be used in any sails project. The best way to understand how to use this module is to refer to examples.
Examples are located in `config/env` of this project. We would elaborate few use cases.

### A simple use case where SAILS_ENV is set to `internal` and we have sails app run in production

In this use-case, lets assume you want your sails project is in production and you have to use this project as
external and internal service (which will be called by other user facing services) and you need different config for
both these scenarios. This module will help you doing this as you need to define `SAILS_ENV` to internal in one of
the environment and that instance will pick only the config defined in internal.js file of `config/env` of the sails
project.

```javascript
// production.js
modules.exports = require('sails-env-switch').switch('production',{
  port: 80,
  environment: 'production',
  routes: {
    'GET /foo': 'dummyController.get'
    'POST /bar': 'dummyController.post'
  }
});
```

At this stage you have `SAILS_ENV` variable is set to `internal`.

__Code for Internal.js__

```javascript
modules.exports = require('sails-env-switch').switch('internal',{
  port: 8080,
    environment: 'production',
    routes: {
      'GET /internal/foo': 'dummyController.getFoo'
      'POST /internal/bar': 'dummyController.postBar'
    }
});
```

Now if you open the sails console and try to get the sails config and other variables.

```terminal
sails.config.routes
```

This will give you the values of routes same as in the internal.js

```
routes: {
  'GET /internal/foo': 'dummyController.getFoo'
  'POST /internal/bar': 'dummyController.postBar'
}
```

and not the one in the production.js. Even though the NODE_ENV will be same as production.js but the config will be
taken from internal.js. This helps segregate the configuration for internal and external facets of the service..

#### Use of env-lift with this module

If you are using `env-lift` for your current project, you can easily use this module with `env-lift`. Check the 
following example.

```javascript
// production.js
modules.exports = require('env-lift').load('sample-project-name', require('sails-env-switch').switch('production',{
  port: 80,
  environment: 'production',
  routes: {
    'GET /foo': 'dummyController.get'
    'POST /bar': 'dummyController.post'
  }
}));
```

At this stage you have `SAILS_ENV` variable is set to `internal`.

__Code for Internal.js__

```javascript
modules.exports = require('env-lift').load('sample-project-name', require('sails-env-switch').switch('internal',{
  port: 8080,
    environment: 'production',
    routes: {
      'GET /internal/foo': 'dummyController.getFoo'
      'POST /internal/bar': 'dummyController.postBar'
    }
}));
```

The output will be same as described above.


## Some important thing

- If `SAILS_ENV` is not defined, then the config will be picked by the sails as usual.
- If `SAILS_ENV` is defined to some name, then the same named file should be present in `config/env` folder of sails,
 otherwise it will break
- This module is not the alternative for `env-lift`, this module should be used with `env-lift` to switch the env config
 based on `SAILS_ENV` value.


 ## Contribution
 Contribution is accepted in form of Pull Requests that passes Travis CI tests. You should install this repository using
 `npm install -d` and run `npm test` locally before sending Pull Request.
