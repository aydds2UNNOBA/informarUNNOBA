// Centros service used to communicate Centros REST endpoints
(function () {
  'use strict';

  angular
    .module('centros')
    .factory('CentrosService', CentrosService);

  CentrosService.$inject = ['$resource'];

  function CentrosService($resource) {
    return $resource('api/centros/:centroId', {
      centroId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
