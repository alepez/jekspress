process.env.JEKSPRESS_ROOT_DIR = '/ark/doc/workspace/jekspress/test_site';

var assert = require("assert")
var Pages = require('../lib/pages.js').Pages;

describe('pages', function() {
	it('should load', function(done) {
		var pages = Pages();
		pages.load(function() {
			done();
			console.log(pages.collection[0].metadata);
		});
	});
});
