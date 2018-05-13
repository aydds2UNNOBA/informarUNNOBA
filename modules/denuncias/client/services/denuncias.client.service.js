// Denuncias service used to communicate Denuncias REST endpoints
(function () {
  'use strict';

  angular
    .module('denuncias')
    .factory('DenunciasService', DenunciasService);

  DenunciasService.$inject = ['$resource'];

  function DenunciasService($resource) {
    return $resource('api/denuncias/:denunciaId', {
      denunciaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
