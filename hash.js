var crypto = require('crypto');

function depsToStr(deps) {
	return Object.keys(deps).sort().reduce(function (str, key) {
		return str + key + ':' + deps[key];
	}, '');
}

module.exports = function hash(hash, ns, name, version, deps) {
	return crypto
		.createHash('md5')
    .update(hash + '/' + ns + '/' + name + '/' + version + '/' + depsToStr(deps))
    .digest('hex');
};
