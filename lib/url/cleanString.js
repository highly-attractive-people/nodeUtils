var speakingurl = require('speakingurl');

/**
 * Make a clean, URL-friendly string using all provided scalar values.
 *
 * @params {mixed}
 *   Any scalar value.
 *
 * @return {string}
 *   A url-friendly string.
 */
module.exports = function cleanString() {
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
  output = speakingurl(output);

  return output;
};
