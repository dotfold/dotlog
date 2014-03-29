[![Build Status](https://travis-ci.org/dotfold/dotlog.png?branch=master)](https://travis-ci.org/dotfold/dotlog)

### dotlog

Log your logs to your console with dotlog like

It can have a name. And it can have tokens what get replaced by the extra things you tell it to and it's got some colours too

You can get one by like
```
var dotlog = require('dotlog');

dotlog.getLogger('dumplings');
dotlog.debug('Yo pass me the {0}', 'sauce');

// Thu May 09 2013 20:19:22	DEBUG -	dumplings - Yo pass me the sauce
```
You can use levels which are for tell you the different status like
```
debug
info
warn
error
```

ok good


