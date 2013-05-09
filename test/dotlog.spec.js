
var dotlogger = require('./../lib/dotlog')

describe('dotlogger', function() {

	xdescribe('getLogger', function() {

		it('', function() {

		})

	})

	xdescribe('_formatDate', function() {

	})

	xdescribe('_formatMessage', function() {

	})

	describe('log levels', function() {

		var logger;
		
		beforeEach(function() {
			logger = dotlogger.getLogger('test');
		})

		it('debug', function() {

			var a = logger.debug('what {0}', 'CATS!');

		})

		it('info', function() {

			logger.info('what {0}', 'dude you should know this thing just happened...');

		})

		it('warn', function() {

			logger.warn('what {0}', 'be careful');

		})

		it('error', function() {

			logger.error('what {0}', 'OH NO!');

		})

	})

})