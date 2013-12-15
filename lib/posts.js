var site = require('./site.js');
var extractYaml = require('./yaml_extractor.js').get;
var extractText = require('./text_extractor.js').get;
var fs = require('fs');
var async = require('async');
var path = require('path');
var moment = require('moment');

/**
 * Post
 */
var Post = function() {
	var that = {};
	var metadata = null;
	var content = null;

	var readDateFromFilename = function(filename) {
		return new Date(Date.parse(path.basename(filename).substr(0, 10)));
	};

	var readSlugFromFilename = function(filename) {
		var slug = path.basename(filename);
		slug = slug.substr(0, slug.lastIndexOf('.'));
		slug = slug.substr(11);
		return slug;
	};

	var createURI = function() {
		var d = that.metadata.date;
		var s = that.metadata.slug;
		var uri = moment(d).format('YYYY/MM');;
		uri += '/' + s;
		return uri;
	};

	var load = function(filename, callback) {
		fs.readFile(filename, function(err, data) {
			that.metadata = extractYaml(data.toString());
			that.content = extractText(data.toString());
			that.metadata.slug = readSlugFromFilename(filename);
			that.metadata.date = readDateFromFilename(filename);
			that.metadata.uri = createURI();
			callback(null);
		});
	};

	that.load = load;

	return that;
};

/**
 * Posts
 */
var Posts = function() {
	var that = {};
	var collection = [];

	var load = function(callback) {
		fs.readdir(site.dir.posts, function(err, files) {
			async.each(files, function(filename, callback) {
				var post = Post();
				post.load(path.resolve(site.dir.posts, filename), function(err) {
					collection.push(post);
					callback(null);
				});
			}, function(err) {
				if (typeof callback === 'function') {
					callback(null);
				}
			});
		});
	};

	that.load = load;
	that.collection = collection;

	return that;
};

module.exports.Posts = Posts;
module.exports.Post = Post;
