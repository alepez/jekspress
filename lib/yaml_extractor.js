var yaml = require('js-yaml');

var get = function(data) {
	var lines = data.split('\n');
	var separatorCount = 0;
	var yamlData = "";
	var i, line;
	for (i = 0; i < lines.length; i += 1) {
		line = lines[i];
		if (/^---/.test(line)) {
			separatorCount += 1;
			continue;
		}
		if (separatorCount === 1) {
			yamlData += line + '\n';
		} else if (separatorCount === 2) {
			break;
		}
	}
	return yaml.load(yamlData);
};

module.exports.get = get;
