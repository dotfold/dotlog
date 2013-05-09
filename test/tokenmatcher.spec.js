// replacetokens.spec.js

var expect 		= require('chai').expect
  , matcher 	= require('./../lib/tokenmatcher')

describe('tokenmatcher', function() {

	describe('replaceNamedTokens', function() {
		
		it('should replace simple token', function() {

			var template = 'Hello {name}';
			var data = { name: 'foo' };

			var expected = 'Hello foo';
			var result = matcher.replaceNamedTokens(template, data);

			expect(expected).to.equal(result);
		})
		
		it('should replace multiple tokens', function() {
			var template = 'Hello {fname} {sname}';
			var data = { fname: 'foo', sname: 'bar' };

			var expected = 'Hello foo bar';
			var result = matcher.replaceNamedTokens(template, data);

			expect(expected).to.equal(result);
		})

		it('should leave unreplaced tokens in place', function() {
			var template = 'Hello {fname} {sname}, {message}';
			var data = { fname: 'foo', sname: 'bar' };

			var expected = 'Hello foo bar, {message}';
			var result = matcher.replaceNamedTokens(template, data);

			expect(expected).to.equal(result);
		})

		it('should replace a duplicate token both instances', function() {
			var template = 'Robots {rtype} {ctype} Cats, {rtype} WINs';
			var data = { rtype: 'voltron', ctype: 'nyan' };

			var expected = 'Robots voltron nyan Cats, voltron WINs';
			var result = matcher.replaceNamedTokens(template, data);

			expect(expected).to.equal(result);
		})
		
	});

	describe('replaceNumberedTokens', function() {

		it('should replace the replacement what', function() {

			var template = 'The template is like {0}';
			var args = [ 'what' ];

			var result = matcher.replaceNumberedTokens(template, args);
			expect(result).to.equal('The template is like what');

		})

		it('should replace multiple of the same what', function() {

			var template = '{0}! The template is like {0}';
			var args = [ 'what' ];

			var result = matcher.replaceNumberedTokens(template, args);
			expect(result).to.equal('what! The template is like what');

		})

		it('should replace multiple of what', function() {

			var template = '{0}! The template is like {1}';
			var args = [ 'what', 'yah' ];

			var result = matcher.replaceNumberedTokens(template, args);
			expect(result).to.equal('what! The template is like yah');

		})

		it('should replace multiple of what with weird ordering', function() {

			var template = '{1} The template is like {0}';
			var args = [ 'what', 'noooo!' ];

			var result = matcher.replaceNumberedTokens(template, args);
			expect(result).to.equal('noooo! The template is like what');
		})

		it('should leave unfound tokens as they are what', function() {

			var template = 'So the {0} is like {1} with sauce {2}';
			var args = [ 'dinosaur', 'angry and stuff' ];

			var result = matcher.replaceNumberedTokens(template, args);
			expect(result).to.equal('So the dinosaur is like angry and stuff with sauce {2}');
		})

	})

});







