var path = require('path');
var crypto = require('crypto');
var pkgHash = require('pkg-hash');

function depsToStr(pkg) {
	var deps = pkg.dependencies || {};
	Object.keys(pkg.optionalDependencies || {}).forEach(function(name) {
		delete deps[name];
	});
	return Object.keys(deps).sort().reduce(function(str, key) {
		return str + key + ':' + deps[key];
	}, '');
}

module.exports = function kHash(pkgPath, done) {
	pkgHash(pkgPath, function(err, pHash) {
		if (err) {
			done(err);
		} else {
			var pkg = require(path.join(pkgPath, 'package.json'));
			if (pkg.kevoree && pkg.kevoree.namespace) {
				done(null,
					crypto.createHash('md5')
						.update(pHash + '/' + pkg.kevoree.namespace + '/' + pkg.name + '/' + pkg.version + '/' + depsToStr(pkg))
						.digest('hex'));
			} else {
				done(new Error('The project at "'+pkgPath+'" has no "kevoree.namespace"'));
			}
		}
	});

	return
};
