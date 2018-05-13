(function () {
  'use strict';

  // Centros controller
  angular
    .module('centros')
    .controller('CentrosController', CentrosController);

  CentrosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'centroResolve'];

  function CentrosController ($scope, $state, $window, Authentication, centro) {
    var vm = this;

    vm.authentication = Authentication;
    vm.centro = centro;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Centro
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.centro.$remove($state.go('centros.list'));
      }
    }


    // Save Centro
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.centroForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.centro._id) {
        vm.centro.$update(successCallback, errorCallback);
      } else {
        vm.centro.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('centros.view', {
          centroId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }

}());
