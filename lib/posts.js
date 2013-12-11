var site = require('./site.js');
var fs = require('fs');
var async = require('async');

var Post = function(data) {
	var that = {};

	var load = function(callback) {
		
	};

	return that;
};

var Posts = function(options) {
	var that = {};
	var collection = [];

	var load = function(callback) {
		fs.readdir(site.dir.posts, function(err, files) {
			console.log(files);
			async.each(files, function(filename, callback) {
				callback(null);
			}, function(err) {
				callback(null, collection);
			});
		});
	};

	that.load = load;

	return that;
};

module.exports.Posts = Posts;
module.exports.Post = Post;