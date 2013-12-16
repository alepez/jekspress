var Posts = require('./posts.js').Posts;

var posts = null;

/**
 * Initialize
 */
var initialize = function(callback) {
	posts = Posts();
	posts.load(callback);	
};

/**
 * Middleware
 */
var middleware = function() {
	return function(req, res, next) {
		next();
	};
};

/**
 * Routes
 */
var routes = function(app) {
	app.get('/:year([0-9]{4})/:month([0-9]{2})/:slug', function(req, res) {
		res.send('post get: ' + req.params.year + " " + req.params.month + " " + req.params.slug);
	});

	if ('development' == app.get('env')) {
		app.get('/posts.json', function(req, res) {
			res.json(posts.collection);
		});
	}
};

module.exports.initialize = initialize;
module.exports.middleware = middleware;
module.exports.routes = routes;
