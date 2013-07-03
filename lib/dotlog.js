
/**
 * logging.js:	Simple logger logs it like what
 *
 * (c) 2013, dotfold
 */

// TODO: provide logger factory
// TODO: provide alt loggers, not just console



//
// ### function getLogger name
// #### @name {String} the name of this logger instance
// Creates a new logger object with the given name.
// The name is used in the output, the following template is used:
// <Date> <Level> - <name> - <message>
// 
//
exports.getLogger = require('./consolelogger').getLogger;

//
//
//
exports.setLogLevel;

//
//
//
exports.useLogInterface;

//
//
//
exports.LEVEL = require('./constants').LogLevel;




//
// threshold for messages. TODO:  :(
//
// exports.setLogLevel = function(level) {
// 
// }


