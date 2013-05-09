
/**
 * logging.js:	Simple logger logs it like what
 *
 * (c) 2013, dotfold
 */
var tokenmatcher = require('./tokenmatcher')

// TODO: provide logger factory
// TODO: provide alt loggers, not just console
// TODO: turn off colors option

//
// ### function _loggerImpl name
// #### @name	{String} Name of this logger instance
// Logger object.
// 
var _loggerImpl = function(name) {
	
	//
	// Name of this logger instance
	//
	this.name = name;

	//
	// Message token string
	// 
	this._logTemplate = '{messageColor}{date}\t{level} -\t{nameColor}{name}{messageColor} - {message}{noColor}';

	//
	// Default token replace data
	// 
	this.defaultData = {
		messageColor: 	'\033' + String.fromCharCode(27) + '[36m',
		nameColor: 		'\033' + String.fromCharCode(27) + '[33m',
		noColor:		'\033' + String.fromCharCode(27) + '[39m'
	}

	//
	// Object `map` of colors to use for each LogLevel
	// 
	this.colorsByLogLevel = {
		NONE:	'0',
		DEBUG:	'\033' + String.fromCharCode(27) + '[39m',	// white
		INFO:	'\033' + String.fromCharCode(27) + '[36m',	// cyan
		WARN:	'\033' + String.fromCharCode(27) + '[35m',	// magenta
		ERROR:	'\033' + String.fromCharCode(27) + '[31m'		// red
	}

}

//
// ### function _replaceTokens data
// #### @data	{Object} key value pairs to replace
// Merges the supplied data object with defaults.
// 
_loggerImpl.prototype._replaceTokens = function(data) {

	for (var field in data) {
		this.defaultData[field] = data[field];
	}

	return tokenmatcher.replaceNamedTokens(this._logTemplate, this.defaultData)
}

//
// ### function _formateDate date
// #### @date Date object
// Formats the supplied Date object to a human readable string for output.
//
_loggerImpl.prototype._formatDate = function(date) {

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
_loggerImpl.prototype.formatMessage = function(level, messageargs) {
	
	// NOW
	var date = new Date();

	// replace numbered tokens
	var args = Array.prototype.slice.call(messageargs)
	var msg = args[0];
	var rest = args.slice(1);

	// replace numbered tokens if there are some
	msg = tokenmatcher.replaceNumberedTokens(msg, rest);
	
	// make it all together in a proper what
	var formatted = this._replaceTokens({
		messageColor: this.colorsByLogLevel[level],
		date: this._formatDate(date),
		level: level,
		name: this.name,
		message: msg
	})

	// finally log it what
	return formatted;
}

//
// ### function debug msg, args
// #### @msg 	{String} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs a DEBUG level message to the console.
// 
_loggerImpl.prototype.debug = function() {
	console.log(this.formatMessage('DEBUG', arguments));
}

//
// ### function info msg, args
// #### @msg 	{String} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs an INFO level message to the console.
// 
_loggerImpl.prototype.info = function() {
	console.log(this.formatMessage('INFO', arguments));
}

//
// ### function warn msg, args
// #### @msg 	{String} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs a WARN level message to the console.
// 
_loggerImpl.prototype.warn = function(msg, args) {
	console.log(this.formatMessage('WARN', arguments));
}

//
// ### function error msg, args
// #### @msg 	{String} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs an ERROR level message to the console.
// 
_loggerImpl.prototype.error = function(msg, args) {
	console.log(this.formatMessage('ERROR', arguments));
}


//
// ### function getLogger name
// #### @name {String} the name of this logger instance
// Creates a new logger object with the given name.
// The name is used in the output, the following template is used:
// <Date> <Level> - <name> - <message>
// 
exports.getLogger = function(name) {
	return new _loggerImpl(name);
}

//
// threshold for messages. TODO:  :(
//
// exports.setLogLevel = function(level) {
// 
// }

//
// @LEVEL expose the available levels.
// 
exports.LEVEL = {
	NONE:	'none',
	DEBUG: 	'debug',
	INFO: 	'info',
	WARN:	'warn',
	ERROR:	'error'
}

