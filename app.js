var express = require('express');
var http = require('http');
var path = require('path');

var site = require('./lib/site.js');
var jekspress = require('./lib/jekspress.js');

var app = express();

site.settings['url_suffix'] = '';

jekspress.setup();

app.set('port', process.env.PORT || 3000);
app.set('views', site.dir.views);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

jekspress.setupMiddlewares(app);

app.use(app.router);
app.use(express.static(site.dir.public));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

jekspress.setupRoutes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
