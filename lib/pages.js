var site = require('./site.js');
var extractYaml = require('./yaml_extractor.js').get;
var extractText = require('./text_extractor.js').get;
var fs = require('fs');
var async = require('async');
var path = require('path');
var moment = require('moment');
var marked = require('marked');

/**
 * Page
 */
var Page = function() {
	var that = {};

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
		var uri = moment(d).format('YYYY/MM');
		uri += '/' + s;
		return uri;
	};

	var load = function(filename, callback) {
		fs.readFile(filename, function(err, data) {
			var metadata = extractYaml(data.toString());
			var text = extractText(data.toString());
			that.metadata = metadata;
			that.content = {
				text : text,
				html : marked(text)
			};
			that.metadata.slug = readSlugFromFilename(filename);
			that.metadata.date = readDateFromFilename(filename);
			that.metadata.uri = createURI();
			that.metadata.url = '/' + that.metadata.uri + '.html';
			that.metadata.src = path.basename(filename);
			that.title = that.metadata.title;
			callback(null);
		});
	};

	that.load = load;

	return that;
};

/**
 * Pages
 */
var Pages = function() {
	var that = {};
	var collection = [];

	var load = function(callback) {
		fs.readdir(site.dir.pages, function(err, files) {
			async.each(files, function(filename, callback) {
				var page = Page();
				page.load(path.resolve(site.dir.pages, filename), function(err) {
					collection.push(page);
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

module.exports.Pages = Pages;
module.exports.Page = Page;
