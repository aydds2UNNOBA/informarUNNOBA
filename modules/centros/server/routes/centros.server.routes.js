'use strict';

/**
 * Module dependencies
 */
var centrosPolicy = require('../policies/centros.server.policy'),
  centros = require('../controllers/centros.server.controller');

module.exports = function(app) {
  // Centros Routes
  app.route('/api/centros').all(centrosPolicy.isAllowed)
    .get(centros.list)
    .post(centros.create);

  app.route('/api/centros/:centroId').all(centrosPolicy.isAllowed)
    .get(centros.read)
    .put(centros.update)
    .delete(centros.delete);

  // Finish by binding the Centro middleware
  app.param('centroId', centros.centroByID);
};
