'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;
    
    $scope.citys = ['Arrecifes',
                    'Baradero',
                    'Capitán Sarmiento',
                    'Carmen de Areco',
                    'Colón',
                    'Pergamino',
                    'Ramallo',
                    'Rojas',
                    'Salto',
                    'San Andrés de Giles',
                    'San Antonio de Areco',
                    'San Nicolas',
                    'San Pedro'];

    $scope.remove = function (user) {
      if (confirm('¿Está seguro que desea eliminar este usuario?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.activar = function () {
      if(!$scope.user.isActive){
        if (confirm('¿Está seguro que desea ACTIVAR esta cuenta?')) {
          var user = $scope.user;
          user.$activar(function () {
            $state.go('admin.users', {
              userId: user._id
            });
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        }
      }
    };

    $scope.desactivar = function () {
      if($scope.user.isActive){
        if (confirm('¿Está seguro que desea DESACTIVAR esta cuenta?')) {
          var user = $scope.user;
          user.$activar(function () {
            $state.go('admin.users', {
              userId: user._id
            });
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        }
      }
    };

    $scope.update = function () {
      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
