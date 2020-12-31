'use-strict';

const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

describe('Framework Test: Mocha, Chai, Sinon', () => {
  it('should expose the Mocha "describe" and "it" methods', () => {
    assert.ok('Describe', 'imported');
    assert.ok('It', 'imported');
  });

  it('should expose the Chai "assert" method', () => {
    assert.ok('Assert', 'imported');
  });

  it('should expose the Chai "expect" method', () => {
    expect('Expect').to.not.equal('imported');
  });

  it('should expose the Chai "should" method', () => {
    should.exist('Should');
    'Should'.should.equal('Should');
  });

  it('should expose the Sinon "spy()" method', () => {
    const thing = {
      callCallback: function callBack(cb) {
        cb();
      }
    };

    const spy = sinon.spy();
    thing.callCallback(spy);
    assert.ok(spy.called);
  });
});
