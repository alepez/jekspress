var assert = require("assert")

var yaml_extractor = require('../lib/yaml_extractor.js');

describe('yaml_extractor', function() {
	it('should get data betwenn two ---', function() {
		var input = '---\nfoo: bar\n---\n';
		var output = yaml_extractor.get(input);
		assert.equal('bar', output.foo);
	});
});
