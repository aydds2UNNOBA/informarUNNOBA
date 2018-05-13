(function () {
  'use strict';

  angular
    .module('centros')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('centros', {
        abstract: true,
        url: '/centros',
        template: '<ui-view/>'
      })
      .state('centros.list', {
        url: '',
        templateUrl: 'modules/centros/views/list-centros.client.view.html',
        controller: 'CentrosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Centros List'
        }
      })
      .state('centros.create', {
        url: '/create',
        templateUrl: 'modules/centros/views/form-centro.client.view.html',
        controller: 'CentrosController',
        controllerAs: 'vm',
        resolve: {
          centroResolve: newCentro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Centros Create'
        }
      })
      .state('centros.edit', {
        url: '/:centroId/edit',
        templateUrl: 'modules/centros/views/form-centro.client.view.html',
        controller: 'CentrosController',
        controllerAs: 'vm',
        resolve: {
          centroResolve: getCentro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Centro {{ centroResolve.name }}'
        }
      })
      .state('centros.view', {
        url: '/:centroId',
        templateUrl: 'modules/centros/views/view-centro.client.view.html',
        controller: 'CentrosController',
        controllerAs: 'vm',
        resolve: {
          centroResolve: getCentro
        },
        data: {
          pageTitle: 'Centro {{ centroResolve.name }}'
        }
      });
  }

  getCentro.$inject = ['$stateParams', 'CentrosService'];

  function getCentro($stateParams, CentrosService) {
    return CentrosService.get({
      centroId: $stateParams.centroId
    }).$promise;
  }

  newCentro.$inject = ['CentrosService'];

  function newCentro(CentrosService) {
    return new CentrosService();
  }
}());
