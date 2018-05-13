(function () {
  'use strict';

  angular
    .module('estadisticas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('estadisticas', {
        abstract: true,
        url: '/estadisticas',
        template: '<ui-view/>'
      })
      .state('estadisticas.list', {
        url: '',
        templateUrl: 'modules/estadisticas/views/list-estadisticas.client.view.html',
        controller: 'EstadisticasListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Estadisticas List'
        }
      })
      .state('estadisticas.create', {
        url: '/create',
        templateUrl: 'modules/estadisticas/views/form-estadistica.client.view.html',
        controller: 'EstadisticasController',
        controllerAs: 'vm',
        resolve: {
          estadisticaResolve: newEstadistica
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Estadisticas Create'
        }
      })
      .state('estadisticas.edit', {
        url: '/:estadisticaId/edit',
        templateUrl: 'modules/estadisticas/views/form-estadistica.client.view.html',
        controller: 'EstadisticasController',
        controllerAs: 'vm',
        resolve: {
          estadisticaResolve: getEstadistica
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Estadistica {{ estadisticaResolve.name }}'
        }
      })
      .state('estadisticas.view', {
        url: '/:estadisticaId',
        templateUrl: 'modules/estadisticas/views/view-estadistica.client.view.html',
        controller: 'EstadisticasController',
        controllerAs: 'vm',
        resolve: {
          estadisticaResolve: getEstadistica
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Estadistica {{ estadisticaResolve.name }}'
        }
      });
  }

  getEstadistica.$inject = ['$stateParams', 'EstadisticasService'];

  function getEstadistica($stateParams, EstadisticasService) {
    return EstadisticasService.get({
      estadisticaId: $stateParams.estadisticaId
    }).$promise;
  }

  newEstadistica.$inject = ['EstadisticasService'];

  function newEstadistica(EstadisticasService) {
    return new EstadisticasService();
  }
}());
