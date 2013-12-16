var Posts = require('./posts.js').Posts;
var _ = require('underscore');

var posts = null;
var postsByURI = {};

/**
 * Initialize
 */
var initialize = function(callback) {
	posts = Posts();
	posts.load(function(err) {
		console.log('posts loaded');

		_.each(posts.collection, function(post) {
			postsByURI[post.metadata.uri] = post;
		});

		if (typeof callback === 'function') {
			callback(err);
		}
	});
};

/**
 * Middleware
 */
var middleware = function() {
	return function(req, res, next) {
		var uri = req.url.toString().toLowerCase();
		uri = uri.replace(/\.html$/, '').replace(/^\//, '');
		var post = postsByURI[uri];
		if (!post) {
			next();
		}
		res.render(post.view || 'posts/view', {
			'post' : post
		});
	};
};

/**
 * Routes
 */
var routes = function(app) {
	if ('development' == app.get('env')) {
		app.get('/posts.json', function(req, res) {
			res.json(posts.collection);
		});
	}
};

module.exports.initialize = initialize;
module.exports.middleware = middleware;
module.exports.routes = routes;
