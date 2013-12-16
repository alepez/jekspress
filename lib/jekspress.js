var je_posts = require('./je_posts.js');

var setup = function(options) {
	je_posts.initialize();
};

var setupMiddlewares = function(app) {
	app.use(je_posts.middleware());
};

var setupRoutes = function(app) {
	je_posts.routes(app);
};

module.exports.setup = setup;
module.exports.setupMiddlewares = setupMiddlewares;
module.exports.setupRoutes = setupRoutes;
