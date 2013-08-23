//
// formatter.js
//

var tokenmatcher = require('./tokenmatcher')
  , constants = require('./constants')

//
// ### function _formateDate date
// #### @date Date object
// Formats the supplied Date object to a human readable string for output.
//
var formatDate = function(date) {

	return date.toDateString() + ' '
		+ date.getHours()+ ':'
		+ date.getMinutes() + ':'
		+ date.getSeconds();
}


//
// ### function formatMessage level, msg
// #### @level {String} LogLevel for this message
// #### @msg {String} The message to log to stdout
// Formats a message with date, name and message by replacing named and numbered
// tokens as they appear in the message 'template'.
// 
var formatMessage = function(level, name, messageargs) {
	
	// NOW
	var date = new Date();

	// replace numbered tokens
	var args = Array.prototype.slice.call(messageargs)
	var msg = args[0];
	var rest = args.slice(1);

	// replace numbered tokens if there are some
	msg = tokenmatcher.replaceNumberedTokens(msg, rest);
	
	// make it all together in a proper what
	var formatted = replaceTokens({
		messageColor: constants.colorsByLogLevel[level],
		date: formatDate(date),
		level: level,
		name: name,
		message: msg
	})

	return formatted;
}

var defaultData = {
	messageColor: 	'\033' + String.fromCharCode(27) + '[36m',
	nameColor: 		'\033' + String.fromCharCode(27) + '[33m',
	noColor:		'\033' + String.fromCharCode(27) + '[39m'
}

//
// ### function _replaceTokens (data)
// #### @data	{object} key value pairs to replace
// Merges the supplied data object with defaults.
// 
var replaceTokens = function(data) {

	for (var field in data) {
		defaultData[field] = data[field];
	}

	return tokenmatcher.replaceNamedTokens(constants.logTemplate, defaultData)
}

//
//
//
exports.formatDate = formatDate;
exports.formatMessage = formatMessage;
exports.replaceTokens = replaceTokens;