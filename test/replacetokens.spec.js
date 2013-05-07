// replacetokens.spec.js

var expect 		= require('chai').expect
  , replacer 	= require('./../lib/replacetokens')

describe('replacetokens', function() {
	
	it('should replace simple token', function() {

		var template = 'Hello {name}';
		var data = { name: 'foo' };

		var expected = 'Hello foo';
		var result = replacer.replace(template, data);

		expect(expected).to.equal(result);
	})
	
	it('should replace multiple tokens', function() {
		var template = 'Hello {fname} {sname}';
		var data = { fname: 'foo', sname: 'bar' };

		var expected = 'Hello foo bar';
		var result = replacer.replace(template, data);

		expect(expected).to.equal(result);
	})

	it('should leave unreplaced tokens in place', function() {
		var template = 'Hello {fname} {sname}, {message}';
		var data = { fname: 'foo', sname: 'bar' };

		var expected = 'Hello foo bar, {message}';
		var result = replacer.replace(template, data);

		expect(expected).to.equal(result);
	})
	
});

describe('extract', function() {

	it('should find token at end', function() {

		var template = "Number at end {0}";

		var result = replacer.extract(template);
		expect(result.length).to.equal(1);
	})

	it('should find token at start', function() {
		var template = "{0}: Number at start";

		var result = replacer.extract(template);
		expect(result.length).to.equal(1);
	})

	it('should find token mixed with text', function() {
		var template = "Number in {0} middle";

		var result = replacer.extract(template);
		expect(result.length).to.equal(1);
	})

	it('should find multiple tokens', function() {
		var template = "{0} Number at {2} what {1}";

		var result = replacer.extract(template);
		expect(result.length).to.equal(3);
	})

	it('should contain object', function() {
		var template = "Number at end {0}";

		var result = replacer.extract(template);
		var o = result[0].orig;
		var k = result[0].key;
		expect(o).to.equal("{0}");
		expect(k).to.equal(0);
	})

})







