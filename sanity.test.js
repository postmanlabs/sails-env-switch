const
    chai = require('chai'),
    expect = chai.expect;

describe('with-sails-env', function () {
    before(function() {
        process.env.SAILS_ENV = 'internal';
    })

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

describe('with-sails-env switchV2', function () {
    before(function() {
        process.env.SAILS_ENV = 'v2-internal';
    })

    it('sails config to have port', function () {
        expect(require('./config/env/v2-development').port).to.equal(6060);
    });

    it('sails config to have environment', function () {
        expect(require('./config/env/v2-development').environment).to.equal('v2-internal');
    });

    it('sails config to have log', function () {
        expect(require('./config/env/v2-development').log.level).to.equal('silly');
    });

    it('sails config to have new variables', function () {
        expect(require('./config/env/v2-development').foo.bar).to.equal('v2-dummy');
    });

    it('sails config does not have model', function () {
        expect(require('./config/env/v2-development').models).to.equal(undefined);
    });
});
