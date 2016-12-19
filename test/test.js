var path = require('path');
var assert = require('assert');
var kHash = require('../hash');

function assertHashesEquals(name, done) {
	kHash(path.resolve('test', 'fixtures', name, name), function (err, hash0) {
		if (err) {
			done(err);
		} else {
			kHash(path.resolve('test', 'fixtures', name, 'npm-'+name), function (er, hash1) {
				if (er) {
					done(er);
				} else {
					assert.equal(hash0, hash1);
					done();
				}
			});
		}
	});
}

describe('kHash()', function () {
	describe('compare local & npm-installed projects', function () {
		it('with no deps', function (done) {
			assertHashesEquals('simple', done);
		});

		it('with deps', function (done) {
			assertHashesEquals('deps', done);
		});

		it('with multiple deps', function (done) {
			// deps are not in same order in local and in npm-installed
			// to ensure that even in this case the hash is the same
			assertHashesEquals('multiple-deps', done);
		});

		it('with optDeps', function (done) {
			assertHashesEquals('opt-deps', done);
		});
	});
});
