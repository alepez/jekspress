var get = function(data) {
	var lines = data.split('\n');
	var separatorCount = 0;
	var i, line;
	var output = "";
	for (i = 0; i < lines.length; i += 1) {
		line = lines[i];
		if (/^---/.test(line) && separatorCount < 2) {
			separatorCount += 1;
			continue;
		}
		output += line + '\n';
	}
	return output;
};

module.exports.get = get;
