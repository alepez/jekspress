var path = require('path');

var rootDir = path.resolve(process.env.JEKSPRESS_ROOT_DIR || __dirname);

module.exports.directories = {
	'root' : rootDir,
	'public' : path.resolve(rootDir, 'public'),
	'views' : path.resolve(rootDir, 'views'),
	'contents' : path.resolve(rootDir, 'contents'),
	'posts' : path.resolve(rootDir, 'posts'),
	'pages' : path.resolve(rootDir, 'pages')
};
