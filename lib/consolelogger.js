//
// consolelogger
// 
// (c) 2013, dotfold
//

var tokenmatcher = require('./tokenmatcher')
  , formatter = require('./formatter')
  , constants = require('./constants')
  , LogLevel = require('./constants').Level
  , names = require('./constants').levelNames

// TODO: provide logger factory
// TODO: turn off colors option

var _globalLevel = level.INFO;

// if info, switch off debug
// if warn, switch off debug, info
// if error, switch off debug, info, warn


//
// ### function _loggerImpl name
// #### @name	{String} Name of this logger instance
// Logger object.
// 
var _loggerImpl = function(name, level) {
	
	//
	// Name of this logger instance
	//
	this.name = name;

	//
	// Log level of this instance. Messages lower than this level will not be logged.
	//
	this.level = level || _globalLevel;

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
}

_loggerImpl.prototype.getName = function() {
	return this.name;
}

//
// ### function _replaceTokens (data)
// #### @data	{object} key value pairs to replace
// Merges the supplied data object with defaults.
// 
_loggerImpl.prototype._replaceTokens = function(data) {

	for (var field in data) {
		this.defaultData[field] = data[field];
	}

	return tokenmatcher.replaceNamedTokens(this._logTemplate, this.defaultData)
}

//
// ### function _formatMessage (level)
// #### @level			{string}
// #### @messageArgs 	{array}
//
_loggerImpl.prototype._formatMessage = function(level, messageArgs) {
    return formatter.formatMessage(level, messageArgs);
}


//
//
//
_loggerImpl.prototype.log = function(level, args) {
	
}

//
// ### function debug msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs a DEBUG level message to the console.
// 
_loggerImpl.prototype.debug = function() {
	if (LogLevel.DEBUG.ordinal & this.level.mask) {
		console.log('ok to DEBUG');
	}
	// console.log(this.formatMessage('DEBUG', arguments));
}

//
// ### function info msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs an INFO level message to the console.
// 
_loggerImpl.prototype.info = function() {
	if (LogLevel.INFO.ordinal & this.level.mask) {
		console.log('ok to INFO');
	}
	// console.log(this.formatMessage('INFO', arguments));
}

//
// ### function warn msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs a WARN level message to the console.
// 
_loggerImpl.prototype.warn = function(msg, args) {
	if (LogLevel.WARN.ordinal & this.level.mask) {
		console.log('ok to WARN');
	}
	// console.log(this.formatMessage('WARN', arguments));
}

//
// ### function error msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs an ERROR level message to the console.
// 
_loggerImpl.prototype.error = function(msg, args) {
	if (LogLevel.ERROR.ordinal & this.level.mask) {
		console.log('ok to debug');
	}
	// console.log(this.formatMessage('ERROR', arguments));
}


//
// ### function getLogger name
// #### @name {string} the name of this logger instance
// #### @level {object} optional level for this logger instance
// 
// Creates a new logger object with the given name.
// The name is used in the output, the following template is used:
// <Date> <Level> - <name> - <message>
// 
exports.getLogger = function(name, level) {
	return new _loggerImpl(name, level);
}



