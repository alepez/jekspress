var je_posts = require('./je_posts.js');
var je_pages = require('./je_pages.js');

var setup = function(options) {
	je_posts.initialize();
	je_pages.initialize();
};

var setupMiddlewares = function(app) {
	app.use(je_posts.middleware());
	app.use(je_pages.middleware());
};

var setupRoutes = function(app) {
	je_posts.routes(app);
	je_pages.routes(app);
};

module.exports.setup = setup;
module.exports.setupMiddlewares = setupMiddlewares;
module.exports.setupRoutes = setupRoutes;
