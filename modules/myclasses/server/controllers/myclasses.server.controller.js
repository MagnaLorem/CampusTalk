'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Myclass = mongoose.model('Myclass'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Myclass
 */
exports.create = function(req, res) {
  var myclass = new Myclass(req.body);
  //myclass.user = req.user;

  myclass.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(myclass);
    }
  });
};

/**
 * Show the current Myclass
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var myclass = req.myclass ? req.myclass.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  myclass.isCurrentUserOwner = req.user && myclass.user && myclass.user._id.toString() === req.user._id.toString();

  res.jsonp(myclass);
};

/**
 * Update a Myclass
 */
exports.update = function(req, res) {
  var myclass = req.myclass;

  myclass = _.extend(myclass, req.body);

  myclass.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(myclass);
    }
  });
};

/**
 * Delete an Myclass
 */
exports.delete = function(req, res) {
  var myclass = req.myclass;

  myclass.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(myclass);
    }
  });
};

/**
 * List of Myclasses
 */
exports.list = function(req, res) {
  Myclass.find().sort('courseCode').exec(function(err, myclasses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(myclasses);
    }
  });
};

/**
 * Myclass middleware
 */
exports.myclassByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Myclass is invalid'
    });
  }

  Myclass.findById(id).populate('user', 'displayName').exec(function (err, myclass) {
    if (err) {
      return next(err);
    } else if (!myclass) {
      return res.status(404).send({
        message: 'No Myclass with that identifier has been found'
      });
    }
    req.myclass = myclass;
    next();
  });
};
