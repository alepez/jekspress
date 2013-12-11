var site = require('./site.js');
var extractYaml = require('./yaml_extractor.js').get;
var extractText = require('./text_extractor.js').get;
var fs = require('fs');
var async = require('async');
var path = require('path');

var Post = function() {
	var that = {};
	var metadata = null;
	var content = null;
	
	var load = function(filename, callback) {
		fs.readFile(filename, function(err, data) {
			metadata = extractYaml(data.toString());
			content = extractText(data.toString());
			callback(null);
		});
	};
	
	that.load = load;

	return that;
};

var Posts = function() {
	var that = {};
	var collection = [];

	var load = function(callback) {
		fs.readdir(site.dir.posts, function(err, files) {
			console.log(files);
			async.each(files, function(filename, callback) {
				var post = Post();
				post.load(path.resolve(site.dir.posts, filename), function(err) {
					callback(null);
				});
			}, function(err) {
				callback(null);
			});
		});
	};

	that.load = load;

	return that;
};

module.exports.Posts = Posts;
module.exports.Post = Post;
