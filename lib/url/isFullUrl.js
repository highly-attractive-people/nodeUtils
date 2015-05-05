var u = require('url');

/**
 * Determine if provided string has the minimal properties of a valid URL.
 *
 * @param  {string} string
 *   The string representation of a fully-qualified URL. Protocol-relative are
 *   URLs okay, too.
 *
 * @return {Boolean}
 */
module.exports = function isFullUrl(string) {
  try {
    var parsedUrl = u.parse(string, true, true);
    return !!(parsedUrl.host && parsedUrl.path);
  }
  catch (e) {
    return false;
  }
};

