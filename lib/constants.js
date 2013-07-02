//
// constants.js
//

exports.Level = {
	DEBUG:	{ordinal: 1, mask: createMask(true, true, true, true)},
	INFO:	{ordinal: 2, mask: createMask(false, true, true, true)}
	WARN:	{ordinal: 4, mask: createMask(false, false, true, true)}
	ERROR:	{ordinal: 8, mask: createMask(false, false, false, true)}
}

function createMask() {
	var nMask = 0, nFlag = 0, nLen = arguments.length > 32 ? 32 : arguments.length;
  	for (nFlag; nFlag < nLen; nMask |= arguments[nFlag] << nFlag++);
  	return nMask;
}
//
// @LEVEL expose the available levels.
// 
exports.levelNames = {
	DEBUG: 	'debug',
	INFO: 	'info',
	WARN:	'warn',
	ERROR:	'error'
}

exports.colorsByLogLevel = {
	DEBUG:	'\033' + String.fromCharCode(27) + '[39m',	// white
	INFO:	'\033' + String.fromCharCode(27) + '[36m',	// cyan
	WARN:	'\033' + String.fromCharCode(27) + '[35m',	// magenta
	ERROR:	'\033' + String.fromCharCode(27) + '[31m'	// red
}