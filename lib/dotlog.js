
/**
 * logging.js:	Simple logger
 *
 * (c) 2013, dotfold
 */
var r = require('./replacetokens')

// TODO: provide logger factory
// TODO: provide alt loggers, not just console

//
// ### function _loggerImpl name
// #### @name {String} Name of this logger instance
// Logger object
// 
var _loggerImpl = function(name) {
	
	//
	// Name of this logger instance
	//
	this.name = name;

	//
	// Message token string
	// 
	_logTemplate = '{messageColor}{date} {level} - {nameColor}{name}{messageColor} - {message}{noColor}';

	//
	// Default token replace data
	// 
	var defaultData = {
		messageColor: 	'\033' + String.fromCharCode(27) + '[36m',
		nameColor: 		'\033' + String.fromCharCode(27) + '[33m',
		noColor:		'\033' + String.fromCharCode(27) + '[39m'
	}

	//
	// Object `map` of colors to use for each LogLevel
	// 
	var colorsByLogLevel = {
		NONE:	'0',
		DEBUG:	'\033' + String.fromCharCode(27) + '[39m',	// white
		INFO:	'\033' + String.fromCharCode(27) + '[36m',	// cyan
		WARN:	'\033' + String.fromCharCode(27) + '[35m',	// magenta
		ERROR:	'\033' + String.fromCharCode(27) + '[31m'		// red
	}

	//
	// ### function _replaceTokens data
	// #### @data {Object} key value pairs to replace
	// Merges the supplied data object with defaults
	// 
	_replaceTokens = function(data) {

		for (var field in data) {
			defaultData[field] = data[field];
		}

		return r.replace(_logTemplate, defaultData)
	}

	//
	// ### function _formateDate date
	// #### @date Date object
	// Formats the supplied Date object to a human readable string for output.
	//
	_formatDate = function(date) {

		return date.toDateString() + ' '
			+ date.getHours()+ ':'
			+ date.getMinutes() + ':'
			+ date.getSeconds();
	}

	//
	// ### function _log level, msg
	// #### @level {String} LogLevel for this message
	// #### @msg {String} The message to log to stdout
	// Formats a message with date, name and message and
	// outputs the result to the console
	// 
	_log = function(level, msg) {
		var date = new Date();

		// replace numbered tokens
		var args = Array.prototype.slice.call(arguments)
		console.log(args.length);

		var replaced = _replaceTokens({
			messageColor: colorsByLogLevel[level],
			date: _formatDate(date),
			level: level,
			name: this.name,
			message: msg
		})

		// for like {0}, {1} etc in args
		var tokenized = '';
		// regex to array
		// run through the array, and the args.slice
		// and match them up
		// any remaining ones just spit them out the end

		console.log(replaced);
	}
}

//
// ### function debug msg, args
// #### @msg {String} message to log
// #### @args {Array} any arguments to append to log
// Outputs a DEBUG level message to the console.
// 
_loggerImpl.prototype.debug = function(msg, args) {
		_log.call(this, 'DEBUG', msg, args);
}

//
// ### function info msg, args
// #### @msg {String} message to log
// #### @args {Array} any arguments to append to log
// Outputs an INFO level message to the console.
// 
_loggerImpl.prototype.info = function(msg, args) {
	_log.call(this, 'INFO', msg);
}

//
// ### function warn msg, args
// #### @msg {String} message to log
// #### @args {Array} any arguments to append to log
// Outputs a WARN level message to the console.
// 
_loggerImpl.prototype.warn = function(msg, args) {
	_log.call(this, 'WARN', msg);
}

//
// ### function error msg, args
// #### @msg {String} message to log
// #### @args {Array} any arguments to append to log
// Outputs an ERROR level message to the console.
// 
_loggerImpl.prototype.error = function(msg, args) {
	_log.call(this, 'ERROR', msg);
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
// threshold for messages
//
exports.setLogLevel = function(level) {

}

exports.LEVEL = {
	NONE:	'none',
	DEBUG: 	'debug',
	INFO: 	'info',
	WARN:	'warn',
	ERROR:	'error'
}

