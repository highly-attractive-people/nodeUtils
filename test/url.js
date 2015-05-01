var assert = require('assert');
var url = require('..').url;

describe('url.getPath', function() {
  it('should get path', function() {
    assert.equal(url.getPath('http://nbc.com/foo/bar/baz'), '/foo/bar/baz');
  });

  it('should get path from protocol-relative URLs', function() {
    assert.equal(url.getPath('//nbc.com/foo/bar/baz'), '/foo/bar/baz');
  });

  it('should throw error when URL is invalid', function() {
    assert.throws((function() {
      url.getPath('');
    }), Error, 'URL "" did not have a valid path.');
  });
});

describe('url.replaceBaseWith', function() {
  it('should replace base URL', function() {
    assert.equal(url.replaceBaseWith('http://nbc.com/foo/bar/baz', 'http://localhost:3000/'), 'http://localhost:3000/foo/bar/baz');
  });
});

describe('url.isFullUrl', function() {
  it('should be a full, valid URL', function() {
    assert.equal(true, url.isFullUrl('http://nbc.com/foo/bar'));
    assert.notEqual(true, url.isFullUrl('nbc.com/foo/bar'));
  });
});
