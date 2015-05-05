var u = require('url');

/**
 * Extracts the path portion of a URL.
 *
 * @param  {string} url
 *   The string representation of a fully-qualified URL. Protocol-relative are
 *   URLs okay, too.
 *
 * @throws {Error} if parsed url doesn't have a valid path.
 *
 * @return {string}
 *   The path component of the URL.
 */
module.exports = function getPath(url) {
  var parsedUrl = u.parse(url, true, true);
  if (parsedUrl.path === null) {
    throw new Error('URL "' + url + '" did not have a valid path.');
  }

  return parsedUrl.path;
};
