var expect = require('expect.js');

process.env.SAILS_ENV = 'internal';

describe('example', function () {
  it('sails config to have port', function () {
    expect(require('./config/env/development').port).to.be(5050);
  });

  it('sails config to have environment', function () {
    expect(require('./config/env/development').environment).to.be('internal');
  });

  it('sails config to have log', function () {
    expect(require('./config/env/development').log.level).to.be('silent');
  });

  it('sails config to have new variables', function () {
    expect(require('./config/env/development').foo.bar).to.be('dummy');
  });

  it('sails config does not have model', function () {
    expect(require('./config/env/development').models).to.be(undefined);
  });
});
