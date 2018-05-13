'use strict';

/**
 * Module dependencies
 */
var denunciasPolicy = require('../policies/denuncias.server.policy'),
  denuncias = require('../controllers/denuncias.server.controller');

module.exports = function(app) {
  // Denuncias Routes
  app.route('/api/denuncias').all(denunciasPolicy.isAllowed)
    .get(denuncias.list)
    .post(denuncias.create);

  app.route('/api/denuncias/:denunciaId').all(denunciasPolicy.isAllowed)
    .get(denuncias.read)
    .put(denuncias.update)
    .delete(denuncias.delete);

  // Finish by binding the Denuncia middleware
  app.param('denunciaId', denuncias.denunciaByID);
};
