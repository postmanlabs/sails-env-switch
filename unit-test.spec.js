var chai = require('chai'),
  expect = chai.expect;


process.env.SAILS_ENV = 'internal';

describe('example', function () {
  it('sails config to have port', function () {
    expect(require('./config/env/development').port).to.equal(5050);
  });

  it('sails config to have environment', function () {
    expect(require('./config/env/development').environment).to.equal('internal');
  });

  it('sails config to have log', function () {
    expect(require('./config/env/development').log.level).to.equal('silent');
  });

  it('sails config to have new variables', function () {
    expect(require('./config/env/development').foo.bar).to.equal('dummy');
  });

  it('sails config does not have model', function () {
    expect(require('./config/env/development').models).to.equal(undefined);
  });
});
