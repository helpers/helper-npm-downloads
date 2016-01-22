/*!
 * helper-npm-downloads <https://github.com/helpers/helper-npm-downloads>
 *
 * Copyright (c) 2016 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var templates = require('templates');
var engine = require('engine-base');
var helper = require('./');
var app;

describe('helper-npm-downloads', function() {
  it('should throw an error when nothing is specified', function(cb) {
    try {
      helper();
      cb(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert.equal(err.message, 'expected `repo` to be a string');
      cb();
    }
  });

  it('should return an error when `repo` is not specified', function(cb) {
    helper(function(err) {
      assert(err);
      assert.equal(err.message, 'expected `repo` to be a string');
      cb();
    });
  });

  it('should throw an error when `cb` is not specified', function(cb) {
    try {
      helper('micromatch');
      cb(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert.equal(err.message, 'expected `cb` to be a function');
      cb();
    }
  });

  it('should get total downloads for micromatch', function(cb) {
    helper('micromatch', function(err, total) {
      if (err) return cb(err);
      assert(total >= 17000000)
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed a number', function(cb) {
    helper('micromatch', 30, function(err, total) {
      if (err) return cb(err);
      assert(total >= 1000000)
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed a string', function(cb) {
    helper('micromatch', "30", function(err, total) {
      if (err) return cb(err);
      assert(total >= 1000000)
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed on options as a number', function(cb) {
    helper('micromatch', {last: 30}, function(err, total) {
      if (err) return cb(err);
      assert(total >= 1000000)
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed on options as a string', function(cb) {
    helper('micromatch', {last: "30"}, function(err, total) {
      if (err) return cb(err);
      assert(total >= 1000000)
      cb();
    });
  });

  describe('engine-base', function() {
    beforeEach(function() {
      helper.async = false;
      app = templates();
      app.engine('md', engine);
      app.create('docs');
    });

    it('should throw an error when nothing is specified', function(cb) {
      // incorrectly registered helper
      app.helper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads() %>'});
      app.render(view, function(err) {
        assert(err);
        assert.equal(err.message, 'expected `repo` to be a string');
        cb();
      });
    });

    it('should return an error when `repo` is not specified', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads() %>'});
      app.render(view, function(err) {
        assert(err);
        assert.equal(err.message, 'expected `repo` to be a string');
        cb();
      });
    });

    it('should throw an error when `cb` is not specified', function(cb) {
      // incorrectly registered helper
      app.helper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads("micromatch") %>'});
      app.render(view, function(err, results) {
        try {
          assert(err);
          assert.equal(err.message, 'expected `cb` to be a function');
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get total downloads for micromatch', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads("micromatch") %>'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert(results.content >= 17000000);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed a number', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads("micromatch", 30) %>'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert(results.content >= 1000000);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed a string', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads("micromatch", "30") %>'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert(results.content >= 1000000);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed on options as a number', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads("micromatch", {last: 30}) %>'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert(results.content >= 1000000);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed on options as a string', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.doc('test.md', {content: '<%= downloads("micromatch", {last: "30"}) %>'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert(results.content >= 1000000);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });
  });
});
