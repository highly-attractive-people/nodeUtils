var u = require('url');

/**
 * Replaces the base (protocol + host) of a given URL.
 *
 * @param  {string} originalUrl
 *   The original URL.
 *
 * @param  {string} baseUrl
 *   The fully-qualified base URL to replace the original URL with. Use a
 *   protocol-relative base URL if you want to inherit the original URL's protocol.
 *
 * @throws {Error} if parsed base URL doesn't have a valid host.
 *
 * @return {string}
 *   A new URL using the specified base URL.
 */
module.exports = function replaceBaseWith(originalUrl, baseUrl) {
  var parsedUrl = u.parse(originalUrl, true, true);
  var parsedBaseUrl = u.parse(baseUrl, true, true);
  parsedUrl.protocol = parsedBaseUrl.protocol ? parsedBaseUrl.protocol : parsedUrl.protocol;
  if (!parsedBaseUrl.host) {
    throw new Error('baseUrl "' + baseUrl + '" does not have a valid host value. Ensure a protocol is specified (relative-protocols OK).');
  }

  parsedUrl.host = parsedBaseUrl.host;
  return u.format(parsedUrl);
};
