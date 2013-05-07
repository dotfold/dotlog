
/**
 * replacetokens.js: util method to replace tokens in a string with the named
 * 					 values in a supplied object literal.
 *
 * (c) 2013, dotfold
 */

//
// ### function replace template, data
// #### @template {String} template containing tokens
// #### @data {Object} containing key/value pairs to replace in string
// If no match is found in the data object for a template token,
// the token is left in place.
// 
// Example usage:
// ```
// var template = Welcome to sockly, {name}!;
// var data = { name: 'dotfold' };
// var replaced = replace(template, data);
// console.log(replaced); // Welcome to sockly, dotfold!
// ```
// 
exports.replace = function(template, data) {

	var pattern = new RegExp('{([^}]+)}', 'gi');

	return template.replace(pattern, function(match, $1) {
		if (data && data[$1]) {
			return data[$1];
		}

		return match;
	});
}

//
// ### function extract message
// #### @message {String}
//
exports.extract = function(msg) {

	var pattern = new RegExp("{([0-9^}]+)}", 'ig');
	var mar = msg.match(pattern);
	
	var tokens = [];
	mar.forEach(function(match) {
		var o = {
			orig: match,
			key: parseInt(match.replace('{', '').replace('}', ''))
		}
		tokens.push(o);
	});

	return tokens;
}
