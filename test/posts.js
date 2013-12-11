process.env.JEKSPRESS_ROOT_DIR = '/ark/doc/workspace/jekspress/test_site';

var assert = require("assert")
var Posts = require('../lib/posts.js').Posts;

describe('posts', function() {
	it('should load', function(done) {
		var posts = Posts();
		posts.load(function() {
			assert(true);
			done();
		});
	});
});
