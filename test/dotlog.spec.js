
var dotlog = require('./../lib/dotlog'),
	level = require('./../lib/constants').Levels

describe('dotlogger', function() {

	xdescribe('getLogger', function() {

		it('', function() {

		})

	})

	describe('log levels', function() {

		var logger;
		
		beforeEach(function() {
			logger = dotlog.getLogger('test');
		})

		it('debug', function() {

			logger = dotlog.getLogger('debug', level.DEBUG);
			logger.debug('what debug {0}', 'CATS!');
			logger.info('what info');
			logger.warn('what warn');
			logger.error('what error');

		})

		it('info', function() {

			logger = dotlog.getLogger('info', level.INFO);
			// logger.info('what {0}', 'dude you should know this thing just happened...');
			logger.debug('what debug {0}', 'CATS!');
			logger.info('what info');
			logger.warn('what warn');
			logger.error('what error');

		})

		it('warn', function() {

			logger = dotlog.getLogger('warn', level.WARN);
			// logger.warn('what {0}', 'be careful');
			logger.debug('what debug {0}', 'CATS!');
			logger.info('what info');
			logger.warn('what warn');
			logger.error('what error');

		})

		it('error', function() {

			logger = dotlog.getLogger('warn', level.ERROR);
			// logger.error('what {0}', 'OH NO!');
			logger.debug('what debug {0}', 'CATS!');
			logger.info('what info');
			logger.warn('what warn');
			logger.error('what error');
			
		})

		it('default', function() {
			logger = dotlog.getLogger('default');

			logger.debug('what debug {0}', 'CATS!');
			logger.info('what info');
			logger.warn('what warn');
			logger.error('what error');
		})

	})

})