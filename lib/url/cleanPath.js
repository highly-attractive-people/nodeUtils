var cleanString = require('./cleanString');

/**
 * Make a clean, friendly, partial URL string using all provided scalar values.
 *
 * @params {mixed}
 *   Any scalar value or array of scalar value.
 *
 * @return {string}
 *   A clean, friendly, partial URL string.
 */
module.exports = function cleanPath () {
  var l = arguments.length;
  var parts = [];
  var part;
  for (var i = 0; i < l; i++) {
    part = typeof arguments[i] === 'string' ?
      cleanString(arguments[i]) :
      cleanString.apply(arguments[i], arguments[i]);
    if (part) {
      parts.push(part);
    }
  }
  return parts.join('/');
}
