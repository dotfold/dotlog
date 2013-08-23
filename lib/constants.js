//
// constants.js
//

//
// Each level has a name, ordinal and mask for bitwise comparison.
//
exports.Levels = {
	DEBUG:	{ name: 'DEBUG', ordinal: 1, mask: createMask(true, true, true, true) },
	INFO:	{ name: 'INFO', ordinal: 2, mask: createMask(false, true, true, true) },
	WARN:	{ name: 'WARN', ordinal: 4, mask: createMask(false, false, true, true) },
	ERROR:	{ name: 'ERROR', ordinal: 8, mask: createMask(false, false, false, true) }
}

//
// Create a mask for bitwise comparison
//
function createMask() {
	var nMask = 0, nFlag = 0, nLen = arguments.length > 32 ? 32 : arguments.length;
  	for (nFlag; nFlag < nLen; nMask |= arguments[nFlag] << nFlag++);
  	return nMask;
}

//
// Color strings for level messages
//
exports.colorsByLogLevel = {
	DEBUG:	'\033' + String.fromCharCode(27) + '[39m',	// white
	INFO:	'\033' + String.fromCharCode(27) + '[36m',	// cyan
	WARN:	'\033' + String.fromCharCode(27) + '[35m',	// magenta
	ERROR:	'\033' + String.fromCharCode(27) + '[31m'	// red
}

//
// Message token string
// 
exports.logTemplate = '{messageColor}{date}\t{level} -\t{nameColor}{name}{messageColor} - {message}{noColor}';