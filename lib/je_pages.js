var Pages = require('./pages.js').Pages;
var _ = require('underscore');

var pages = null;
var pagesByURL = {};

/**
 * Initialize
 */
var initialize = function(callback) {
	pages = Pages();
	pages.load(function(err) {
		_.each(pages.collection, function(page) {
			pagesByURL[page.metadata.url] = page;
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
		var url = req.url.toString().toLowerCase();
		var page = pagesByURL[url];
		if (!page) {
			res.json(pagesByURL);
			//return next();
		}
		res.render(page.view || 'pages/view', {
			'page' : page
		});
	};
};

/**
 * Routes
 */
var routes = function(app) {
	if ('development' == app.get('env')) {
		app.get('/pages.json', function(req, res) {
			res.json(pages.collection);
		});
	}
};

module.exports.initialize = initialize;
module.exports.middleware = middleware;
module.exports.routes = routes;
