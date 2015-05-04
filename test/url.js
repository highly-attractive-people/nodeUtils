var assert = require('chai').assert;
var url = require('..').url;

describe('url.getPath', function() {
  it('should get path', function() {
    assert.equal(url.getPath('http://helior.info/foo/bar/baz'), '/foo/bar/baz');
  });

  it('should get path from protocol-relative URLs', function() {
    assert.equal(url.getPath('//helior.info/foo/bar/baz'), '/foo/bar/baz');
  });

  it('should throw error when URL is invalid', function() {
    assert.throws((function() {
      url.getPath('');
    }), Error, 'URL "" did not have a valid path.');
  });

  it('should throw type error when URL is invalid variable type', function() {
    assert.throws(function(){
      url.getPath(1);
    }, TypeError, "Parameter 'url' must be a string, not number");
  });
});

describe('url.replaceBaseWith', function() {
  it('should replace base URL', function() {
    assert.equal(url.replaceBaseWith('http://helior.info/foo/bar/baz', 'http://localhost:3000/'), 'http://localhost:3000/foo/bar/baz');
  });

  it('show throw error when baseUrl is invalid', function() {
    assert.throws((function() {
      url.replaceBaseWith('http://localhost:3000', 'foo');
    }), Error, 'baseUrl "foo" does not have a valid host value. Ensure a protocol is specified (relative-protocols OK).');
  });
});

describe('url.isFullUrl', function() {
  it('should be a full, valid URL', function() {
    assert.equal(true, url.isFullUrl('http://helior.info/foo/bar'));
    assert.notEqual(true, url.isFullUrl('helior.info/foo/bar'));
  });

  it('should return false on invalid URLs', function() {
    assert.isFalse(url.isFullUrl(''));
  });

  it('should return false on invalid data types', function() {
    assert.isFalse(url.isFullUrl(1));
  });
});

describe('url.cleanString', function() {
  it('should clean scalar values as expected', function() {
    assert.equal(url.cleanString('Quick Brown Fox in a Tree'), 'quick-brown-fox-in-a-tree');
    assert.equal(url.cleanString('MyFace', 123, false, 'go home'), 'myface-123-false-go-home');
    assert.equal(url.cleanString('Tom Petty & The Heart Breakers'), 'tom-petty-and-the-heart-breakers');
    assert.equal(url.cleanString('*NSync'), 'nsync');
    assert.equal(url.cleanString('20,000 Leagues Under The Sea'), '20-000-leagues-under-the-sea');
  });

  it('should clean mixed values as expected', function() {
    assert.equal(url.cleanString('    basketball', ['is', 'my', 'favorite'], {'name':'value'}, '   sport  '), 'basketball-sport');
  });
});
