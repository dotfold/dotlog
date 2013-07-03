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

var _defaultLevel = LogLevel.INFO;

var _defaultOutputProviderFunction = console.log;

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
	this.level = level || _defaultLevel;

	//
	//
	//
	this.outProvider = _defaultOutputProviderFunction;
}

_loggerImpl.prototype.getName = function() {
	return this.name;
}

//
// ###
// #### @provider {function}
//
_loggerImpl.prototype.outputProviderFunction = function(provider) {
	this.outProvider = provider;
}

//
// ### function _formatMessage (level)
// #### @level			{string}
// #### @messageArgs 	{array}
//
_loggerImpl.prototype._formatMessage = function(level, messageArgs) {
    return formatter.formatMessage(level, this.name, messageArgs);
}

//
// ### function debug msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs a DEBUG level message to the console.
// 
_loggerImpl.prototype.debug = function() {
	if (LogLevel.DEBUG.ordinal & this.level.mask) {
		console.log(this._formatMessage(LogLevel.DEBUG.name, arguments));
	}
}

//
// ### function info msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs an INFO level message to the console.
// 
_loggerImpl.prototype.info = function() {
	if (LogLevel.INFO.ordinal & this.level.mask) {
		console.log(this._formatMessage(LogLevel.INFO.name, arguments));
	}
}

//
// ### function warn msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs a WARN level message to the console.
// 
_loggerImpl.prototype.warn = function(msg, args) {
	if (LogLevel.WARN.ordinal & this.level.mask) {
		console.log(this._formatMessage(LogLevel.WARN.name, arguments));
	}
}

//
// ### function error msg, args
// #### @msg 	{string} message to log
// #### @args 	{...rest} any arguments to replace tokens in log
// Outputs an ERROR level message to the console.
// 
_loggerImpl.prototype.error = function(msg, args) {
	if (LogLevel.ERROR.ordinal & this.level.mask) {
		console.log(this._formatMessage(LogLevel.ERROR.name, arguments));
	}
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



