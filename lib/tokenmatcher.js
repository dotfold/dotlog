
/**
 * tokenmatcher.js: util method to replace tokens in a string with the named
 * 					 values in a supplied object literal.
 *
 * (c) 2013, dotfold
 */

//
// ### function replaceNamedTokens template, data
// #### @template {String} template containing tokens
// #### @data {Object} containing key/value pairs to replace in string
// If no match is found in the data object for a template token,
// the token is left in place.
// 
// Example usage:
// ```
// var template = Welcome to sockly, {name}!;
// var data = { name: 'dotfold' };
// var replaced = replaceNamedTokens(template, data);
// console.log(replaced); // Welcome to sockly, dotfold!
// ```
// 
exports.replaceNamedTokens = function(template, data) {

	var pattern = new RegExp('{([^}]+)}', 'gi');

	return template.replace(pattern, function(match, $1) {
		if (data && data[$1]) {
			return data[$1];
		}

		return match;
	});
}

//
// ### function replaceNumberedTokens template, replacements
// #### @template		{String}
// #### @replacements	{Array}
// Replaces numbered tokebns enclosed in braces from the template with the corresponding
// index from the replacements array. If a numbered token is included in the template and
// a replacement does not exist, it will be left in place.
// 
// Example usage:
// ```
// var template = 'I heard you like {0}, but {1} are better!';
// var replacements = [ 'cats', 'pocket raptors' ];
// var replaced = replaceNumberedTokens(template, replacements);
// console.log(replaced); // I heard you like cats, but pocket raptors are better!
// 
exports.replaceNumberedTokens = function(template, replacements) {

	var tokenizer = new RegExp('{[^}]*}', 'ig');
	var result = template.replace(tokenizer, function(token) {
		var key = token.substr(1, token.indexOf('}') - 1);
		var replaceWith = replacements[parseInt(key, 10)] || token;
		return replaceWith;
	});
	
	return result;
}	
