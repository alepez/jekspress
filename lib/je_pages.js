var Pages = require('./pages.js').Pages;
var _ = require('underscore');

var pages = null;
var pagesByURI = {};

/**
 * Initialize
 */
var initialize = function(callback) {
	pages = Pages();
	pages.load(function(err) {
		_.each(pages.collection, function(page) {
			pagesByURI[page.metadata.uri] = page;
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
		var format = uri.substr(1 + uri.lastIndexOf('.'));
		uri = uri.replace(/^\//, '');
		uri = uri.substr(0, uri.lastIndexOf('.'));
		var page = pagesByURI[uri];
		if (!page) {
			next();
		}
		switch (format) {
		case 'html':
			res.render(page.view || 'pages/view', {
				'page' : page
			});
			break;
		case 'text':
			res.set('Content-Type', 'text/plain; charset=utf-8');
			res.send(page.content.text);
			break;
		}
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
