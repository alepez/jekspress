var path = require('path');

var rootDir = path.resolve(process.env.JEKSPRESS_ROOT_DIR || __dirname);

module.exports.dir = {
	'root' : rootDir,
	'public' : path.resolve(rootDir, 'public'),
	'views' : path.resolve(rootDir, 'views'),
	'posts' : path.resolve(path.join(rootDir, 'contents', 'posts')),
	'pages' : path.resolve(path.join(rootDir, 'contents', 'pages'))
};
