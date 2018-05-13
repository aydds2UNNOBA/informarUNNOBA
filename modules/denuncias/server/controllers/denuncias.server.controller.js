'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Denuncia = mongoose.model('Denuncia'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Denuncia
 */
exports.create = function(req, res) {
  var denuncia = new Denuncia(req.body);
  denuncia.user = req.user;

  denuncia.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(denuncia);
    }
  });
};

/**
 * Show the current Denuncia
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var denuncia = req.denuncia ? req.denuncia.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  denuncia.isCurrentUserOwner = req.user && denuncia.user && denuncia.user._id.toString() === req.user._id.toString();
  res.jsonp(denuncia);
};

/**
 * Update a Denuncia
 */
exports.update = function(req, res) {
  var denuncia = req.denuncia;

  denuncia = _.extend(denuncia, req.body);

  denuncia.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(denuncia);
    }
  });
};

/**
 * Delete an Denuncia
 */
exports.delete = function(req, res) {
  var denuncia = req.denuncia;

  denuncia.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(denuncia);
    }
  });
};

/**
 * Lista las denuncias dependiendo si el usuario es administrador o no..
 */
exports.list = function(req, res) { 
  if(req.user.roles.indexOf('admin') != -1) {
    console.log(req.user);
    Denuncia.find().sort('-created').populate('user', 'displayName').exec(function(err, denuncias) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(denuncias);
      }
    });
  } else {
    Denuncia.find({'user' : req.user}).sort('-created').populate('user', 'displayName').exec(function(err, denuncias) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(denuncias);
      }
    });
  }
};

/**
 * Denuncia middleware
 */
exports.denunciaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'La Denuncia no es válida'
    });
  }

  Denuncia.findById(id).populate('user', 'displayName').exec(function (err, denuncia) {
    if (err) {
      return next(err);
    } else if (!denuncia) {
      return res.status(404).send({
        message: 'No Denuncia with that identifier has been found'
      });
    }
    req.denuncia = denuncia;
    next();
  });
};
