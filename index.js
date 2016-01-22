/*!
 * helper-npm-downloads <https://github.com/helpers/helper-npm-downloads>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');
var npm;

/**
 * Get the npm download counts for the specified repository.
 *
 * ```html
 * <!-- when registered with `engine-base` as `downloads` -->
 * <%= downloads('micromatch') %>
 * <!-- 17985264 -->
 * ```
 *
 * @param  {String} `repo` Name of the repository to calculate download counts for.
 * @param  {Number|Object} `options` Additional options to control how many days back to get. May be a number specifying last N days.
 * @param  {Number} `options.last` Specify last N days to get downloads for. (Defaults to all downloads).
 * @param  {Function} `cb` Callback function with signature `(err, total)`.
 * @api public
 */

module.exports = function downloads(repo, options, cb) {
  if (typeof repo !== 'string') {
    var err = new TypeError('expected `repo` to be a string');
    if (typeof repo === 'function') {
      return repo(err);
    }
    throw err;
  }

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected `cb` to be a function');
  }

  if (!npm) {
    npm = utils.NpmInfo();
  }

  options = options || {};
  if (utils.isNumber(options)) {
    options = { last: options };
  }

  if (utils.isNumber(options.last)) {
    return npm.repo(repo).last(options.last, cb);
  }
  npm.repo(repo).total(cb);
};
