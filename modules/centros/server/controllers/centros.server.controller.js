'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Centro = mongoose.model('Centro'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Centro
 */
exports.create = function(req, res) {
  var centro = new Centro(req.body);
  centro.user = req.user;

  centro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(centro);
    }
  });
};

/**
 * Show the current Centro
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var centro = req.centro ? req.centro.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  centro.isCurrentUserOwner = req.user && centro.user && centro.user._id.toString() === req.user._id.toString();

  res.jsonp(centro);
};

/**
 * Update a Centro
 */
exports.update = function(req, res) {
  var centro = req.centro;

  centro = _.extend(centro, req.body);

  centro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(centro);
    }
  });
};

/**
 * Delete an Centro
 */
exports.delete = function(req, res) {
  var centro = req.centro;

  centro.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(centro);
    }
  });
};

/**
 * List of Centros
 */
exports.list = function(req, res) {
  Centro.find().sort('-created').populate('user', 'displayName').exec(function(err, centros) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(centros);
    }
  });
};

/**
 * Centro middleware
 */
exports.centroByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Centro is invalid'
    });
  }

  Centro.findById(id).populate('user', 'displayName').exec(function (err, centro) {
    if (err) {
      return next(err);
    } else if (!centro) {
      return res.status(404).send({
        message: 'No Centro with that identifier has been found'
      });
    }
    req.centro = centro;
    next();
  });
};
