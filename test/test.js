var assert = require('assert');
var hash = require('../hash');

describe('hash()', function () {

	it('should be equal even if deps are not in same order', function () {
		var h0 = hash('h', 'a', 'b', 'c', { d: 'e', f: 'g' });
		var h1 = hash('h', 'a', 'b', 'c', { f: 'g', d: 'e' });
		assert.equal(h0, h1);
	});

	it('should differ when hash change', function () {
		var h0 = hash('h', 'a', 'b', 'c', { d: 'e', f: 'g' });
		var h1 = hash('h1', 'a', 'b', 'c', { f: 'g', d: 'e' });
		assert.notEqual(h0, h1);
	});

	it('should differ when namespace change', function () {
		var h0 = hash('h', 'a', 'b', 'c', { d: 'e', f: 'g' });
		var h1 = hash('h', 'a1', 'b', 'c', { f: 'g', d: 'e' });
		assert.notEqual(h0, h1);
	});

	it('should differ when name change', function () {
		var h0 = hash('h', 'a', 'b', 'c', { d: 'e', f: 'g' });
		var h1 = hash('h', 'a', 'b1', 'c', { f: 'g', d: 'e' });
		assert.notEqual(h0, h1);
	});

	it('should differ when version change', function () {
		var h0 = hash('h', 'a', 'b', 'c', { d: 'e', f: 'g' });
		var h1 = hash('h', 'a', 'b', 'c1', { f: 'g', d: 'e' });
		assert.notEqual(h0, h1);
	});

	it('should differ when deps change', function () {
		var h0 = hash('h', 'a', 'b', 'c', { d: 'e', f: 'g' });
		var h1 = hash('h', 'a', 'b', 'c', { f: 'g', d: 'e', 'a': 'b' });
		assert.notEqual(h0, h1);
	});

	it('should be equal even if deps are empty', function () {
		var h0 = hash('h', 'a', 'b', 'c', {});
		var h1 = hash('h', 'a', 'b', 'c', {});
		assert.equal(h0, h1);
	});
});
