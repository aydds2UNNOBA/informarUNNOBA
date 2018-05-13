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

    $scope.municipioCentro = function() {
      switch(vm.centro.municipio_centro) {
        case 'Arrecifes': 
          $scope.localidadesCentro = arrecifes;
          break;
        case 'Baradero':
          $scope.localidadesCentro = baradero;
          break;
        case 'Capitán Sarmiento':
          $scope.localidadesCentro = capitan_sarmiento;
          break;
        case 'Carmen de Areco':
          $scope.localidadesCentro = carmen_de_areco;
          break;
        case 'Colón':
          $scope.localidadesCentro = colon;
          break;
        case 'Pergamino':
          $scope.localidadesCentro = pergamino;
          break;
        case 'Ramallo':
          $scope.localidadesCentro = ramallo;
          break;
        case 'Rojas':
          $scope.localidadesCentro = rojas;
          break;
        case 'Salto':
          $scope.localidadesCentro = salto;
          break;
        case 'San Andrés de Giles':
          $scope.localidadesCentro = san_andres_de_giles;
          break;
        case 'San Antonio de Areco':
          $scope.localidadesCentro = san_antonio_de_areco;
          break;
        case 'San Nicolas':
          $scope.localidadesCentro = san_nicolas;
          break;
        case 'San Pedro':
          $scope.localidadesCentro = san_pedro;
          break;
        case '':
          $scope.localidadesCentro = [];
          break;
        }
      };

       $scope.municipios = [   '',
                    'Arrecifes',
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

    var arrecifes = ['Arrecifes', 'Todd', 'Viña'];
    var baradero = ['Baradero', 'Ireneo Portela', 'Santa Coloma', 'Villa Alsina'];
    var capitan_sarmiento = ['Capitán Sarmiento', 'La Luisa'];
    var carmen_de_areco = ['Carmen de Areco', 'Paraje Kenny', 'Paraje Tatay', 'Pueblo Gouin', 'Tres Sargentos'];
    var colon = ['Colón', 'El Arbolito', 'Pearson', 'Sarasa'];
    var pergamino = ['Acevedo', 'Arroyo del Medio', 'Colonia Buena Vista', 'Colonia Santa Rosa', 'El Socorro', 'Fontezuela', 'Francisco Ayerza', 'Guerrico', 'Juan Anchorena', 'J. A. de la Peña', 'La Vanguardia', 'La Violeta', 'Maguire', 'Manantiales Chico', 'Manantiales Grande', 'Manuel Ocampo', 'Mariano Benítez', 'Mariano H. Alfonzo', 'Ortiz Basualdo', 'Pergamino', 'Pinzón', 'Pujol', 'Rancagua', 'Tambo Nuevo', 'Villa Angélica', 'Villa Dafonte', 'Villa San José', 'Urquiza'];
    var ramallo = ['El Paraíso', 'Pérez Millán', 'Ramallo', 'Villa General Savio', 'Villa Ramallo'];
    var rojas = ['La Beba', 'Las Carabelas', 'Los Indios', 'Rafael Obligado', 'Roberto Cano', 'Rojas', 'Sol de Mayo', 'Villa Manuel Poma', 'Villa Parque Cecir'];
    var salto = ['Arroyo Dulce', 'Berdier', 'Gahan', 'Inés Indart', 'La Invencible', 'Salto'];
    var san_andres_de_giles = ['Azcuénaga', 'Cucullú', 'Franklin', 'San Andrés de Giles', 'Solís', 'Villa Espil', 'Villa Ruiz'];
    var san_antonio_de_areco = ['Duggan', 'San Antonio de Areco', 'Vagués', 'Villa Lía'];
    var san_nicolas = ['Campos Salles', 'Conesa', 'Erézcano', 'General Rojo', 'La Emilia', 'San Nicolas de los Arroyos', 'Villa Campi', 'Villa Esperanza', 'Villa Hermosa', 'Villa Riccio'];
    var san_pedro = ['Gobernador Castro', 'Obligado', 'Pueblo Doyle', 'Río Tala', 'Santa Lucía', 'San Pedro'];


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
