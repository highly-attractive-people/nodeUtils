var u = require('url');

module.exports = {

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
  getPath: function(url) {
    var parsedUrl = u.parse(url, true, true);
    if (parsedUrl.path === null) {
      throw new Error('URL "' + url + '" did not have a valid path.');
    }

    return parsedUrl.path;
  },

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
  replaceBaseWith: function(originalUrl, baseUrl) {
    var parsedUrl = u.parse(originalUrl, true, true);
    var parsedBaseUrl = u.parse(baseUrl, true, true);
    parsedUrl.protocol = parsedBaseUrl.protocol ? parsedBaseUrl.protocol : parsedUrl.protocol;
    if (!parsedBaseUrl.host) {
      throw new Error('baseUrl "' + baseUrl + '" does not have a valid host value. Ensure a protocol is specified (relative-protocols OK).');
    }

    parsedUrl.host = parsedBaseUrl.host;
    return u.format(parsedUrl);
  },

  /**
   * Determine if provided string has the minimal properties of a valid URL.
   *
   * @param  {string} string
   *   The string representation of a fully-qualified URL. Protocol-relative are
   *   URLs okay, too.
   *
   * @return {Boolean}
   */
  isFullUrl: function(string) {
    try {
      var parsedUrl = u.parse(string, true, true);
      return !!(parsedUrl.host && parsedUrl.path);
    }
    catch (e) {
      return false;
    }
  },

  /**
   * Make a clean, URL-friendly string using all provided scalar values.
   *
   * @params {mixed}
   *   Any scalar value.
   *
   * @return {string}
   *   A url-friendly string.
   */
  cleanString: function() {
    var values = [];
    var output;

    // Pluck out all scalar arguments and stringify them.
    for (var i = 0; i< arguments.length;i++) {
      if ((/string|number|boolean/).test(typeof arguments[i])) {
        values.push(String(arguments[i]));
      }
    }

    // Join everything into a single string.
    output = values.join('-');

    // Transliteration and most of the leg-work.
    output = require('speakingurl')(output);

    return output;
  }
};
