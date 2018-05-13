(function () {
  'use strict';

  angular
    .module('denuncias')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('denuncias', {
        abstract: true,
        url: '/denuncias',
        template: '<ui-view/>'
      })
      .state('denuncias.list', {
        url: '',
        templateUrl: 'modules/denuncias/views/list-denuncias.client.view.html',
        controller: 'DenunciasListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Denuncias List'
        }
      })
      .state('denuncias.create', {
        url: '/create',
        templateUrl: 'modules/denuncias/views/form-denuncia.client.view.html',
        controller: 'DenunciasController',
        controllerAs: 'vm',
        resolve: {
          denunciaResolve: newDenuncia
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Denuncias Create'
        }
      })
      .state('denuncias.edit', {
        url: '/:denunciaId/edit',
        templateUrl: 'modules/denuncias/views/form-denuncia.client.view.html',
        controller: 'DenunciasController',
        controllerAs: 'vm',
        resolve: {
          denunciaResolve: getDenuncia
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Denuncia {{ denunciaResolve.name }}'
        }
      })
      .state('denuncias.view', {
        url: '/:denunciaId',
        templateUrl: 'modules/denuncias/views/view-denuncia.client.view.html',
        controller: 'DenunciasController',
        controllerAs: 'vm',
        resolve: {
          denunciaResolve: getDenuncia
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Denuncia {{ denunciaResolve.name }}'
        }
      });
  }

  getDenuncia.$inject = ['$stateParams', 'DenunciasService'];

  function getDenuncia($stateParams, DenunciasService) {
    return DenunciasService.get({
      denunciaId: $stateParams.denunciaId
    }).$promise;
  }

  newDenuncia.$inject = ['DenunciasService'];

  function newDenuncia(DenunciasService) {
    return new DenunciasService();
  }
}());
