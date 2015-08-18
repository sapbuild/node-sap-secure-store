'use strict';
var expect = require('chai').expect;
var FileStore = require('../index.js').FileStore;

function testPassed(done) {
    return function () {
        done();
    };
}
function testFailed(done) {
    return function (err) {
        done(err);
    };
}
function preventOnFulfilled() {
    throw new Error('Promise should not be fulfilled');
}

describe('FileStore', function () {
    describe('#constructor', function () {
        it('should have a mandatory filename parameter', function () {
            expect(function () {
                return new FileStore();
            }).to.throw(TypeError);
            expect(function () {
                return new FileStore(420);
            }).to.throw(TypeError);
        });
        it('has optional encoding and fileMode parameters', function () {
            var stores = [
                new FileStore('foo'),
                new FileStore('foo', 'utf-16'),
                new FileStore('foo', 'utf-16', 438),
                new FileStore('foo', 438)
            ];
            expect(stores[0].encoding).to.equal('utf-8');
            expect(stores[0].fileMode).to.equal(420);
            expect(stores[1].encoding).to.equal('utf-16');
            expect(stores[1].fileMode).to.equal(420);
            expect(stores[2].encoding).to.equal('utf-16');
            expect(stores[2].fileMode).to.equal(438);
            expect(stores[3].encoding).to.equal('utf-8');
            expect(stores[3].fileMode).to.equal(438);
        });
    });
    describe('#write', function () {
        it('should return a rejected Promise if stringify fails', function (done) {
            var obj = { foo: 'bar' };
            obj.inner = obj;
            var store = new FileStore('foo');
            store.write(obj)
                .then(preventOnFulfilled, function (err) {
                    expect(err).to.be.instanceof(TypeError);
                })
                .then(testPassed(done), testFailed(done));
        });
    });
});
