(function () {
  'use strict';

  // Denuncias controller
  angular
    .module('denuncias')
    .controller('DenunciasController', DenunciasController);

  DenunciasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'denunciaResolve'];

  function DenunciasController ($scope, $state, $window, Authentication, denuncia) {
    var vm = this;

    vm.authentication = Authentication;
    vm.denuncia = denuncia;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.checkBoxMotivo = checkBoxMotivo;
    vm.checkBoxAreaReceptora = checkBoxAreaReceptora;
    vm.checkBoxVinculoFamiliar = checkBoxVinculoFamiliar;
    vm.checkBoxVinculoOtros = checkBoxVinculoOtros;
    vm.agregar = agregar;
    vm.eliminar = eliminar;
    vm.checkBoxConsultas = checkBoxConsultas;
    vm.checkBoxDenuncias = checkBoxDenuncias;

    if (!vm.denuncia._id) {
        vm.denuncia.hijos = [];
    }

    $scope.municipioVictima = function() {
      switch(vm.denuncia.municipio_victima) {
        case 'Arrecifes':
          $scope.localidadesVictima = arrecifes;
          break;
        case 'Baradero':
          $scope.localidadesVictima = baradero;
          break;
        case 'Capitán Sarmiento':
          $scope.localidadesVictima = capitan_sarmiento;
          break;
        case 'Carmen de Areco':
          $scope.localidadesVictima = carmen_de_areco;
          break;
        case 'Colón':
          $scope.localidadesVictima = colon;
          break;
        case 'Pergamino':
          $scope.localidadesVictima = pergamino;
          break;
        case 'Ramallo':
          $scope.localidadesVictima = ramallo;
          break;
        case 'Rojas':
          $scope.localidadesVictima = rojas;
          break;
        case 'Salto':
          $scope.localidadesVictima = salto;
          break;
        case 'San Andrés de Giles':
          $scope.localidadesVictima = san_andres_de_giles;
          break;
        case 'San Antonio de Areco':
          $scope.localidadesVictima = san_antonio_de_areco;
          break;
        case 'San Nicolas':
          $scope.localidadesVictima = san_nicolas;
          break;
        case 'San Pedro':
          $scope.localidadesVictima = san_pedro;
          break;
        case '':
          $scope.localidadesVictima = [];
          break;
        }
      };

    $scope.municipioConsultante = function() {
      switch(vm.denuncia.municipio_consultante) {
        case 'Arrecifes':
          $scope.localidadesConsultante = arrecifes;
          break;
        case 'Baradero':
          $scope.localidadesConsultante = baradero;
          break;
        case 'Capitán Sarmiento':
          $scope.localidadesConsultante = capitan_sarmiento;
          break;
        case 'Carmen de Areco':
          $scope.localidadesConsultante = carmen_de_areco;
          break;
        case 'Colón':
          $scope.localidadesConsultante = colon;
          break;
        case 'Pergamino':
          $scope.localidadesConsultante = pergamino;
          break;
        case 'Ramallo':
          $scope.localidadesConsultante = ramallo;
          break;
        case 'Rojas':
          $scope.localidadesConsultante = rojas;
          break;
        case 'Salto':
          $scope.localidadesConsultante = salto;
          break;
        case 'San Andrés de Giles':
          $scope.localidadesConsultante = san_andres_de_giles;
          break;
        case 'San Antonio de Areco':
          $scope.localidadesConsultante = san_antonio_de_areco;
          break;
        case 'San Nicolas':
          $scope.localidadesConsultante = san_nicolas;
          break;
        case 'San Pedro':
          $scope.localidadesConsultante = san_pedro;
          break;
        case '':
          $scope.localidadesConsultante = [];
          break;
        }
      };

      $scope.nombresProfesionales = function() {
        var prov_nomb = $scope.nombres_profesionales.split(',');
        vm.denuncia.nombre_profesional = prov_nomb.filter(Boolean);
      }

      $scope.matriculasProfesionales = function() {
        var prov_matr = $scope.matriculas_profesionales.split(',');
        vm.denuncia.matricula_profesional = prov_matr.filter(Boolean);
      }

      var motivo_consulta = [];

      $scope.motivoConsulta = function(motivo) {
        let index = motivo_consulta.indexOf(motivo);
        if(index > -1) {
          motivo_consulta.splice(index, 1);
        } else {
          motivo_consulta.push(motivo);
        }
        vm.denuncia.motivo_consulta = motivo_consulta;
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

    $scope.est_civiles = [
                    'Soltero/a',
                    'Casado/a',
                    'Viudo/a',
                    'Divorciado/a'];

    $scope.ocupaciones_victima = [
                    'Desempleado/a',
                    'Empleado/a',
                    'Independiente',
                    'Otros'];

    function agregar(sexoValor, edadValor){
      vm.denuncia.hijos.push({sexo : sexoValor, edad : edadValor});
      $scope.sexo_hijo = '';
      $scope.edad_hijo = '';
    }

    function eliminar(index) {
    vm.denuncia.hijos.splice( index, 1 );
    }

    function checkBoxConsultas() {
      if (vm.denuncia.consultas_previas === true ) {
        return false;
      } else {
        return true;
      }
    }

    function checkBoxDenuncias() {
      if (vm.denuncia.otras_denuncias === true ) {
        return false;
      } else {
        return true;
      }
    }

    //CHECKBOX motivo de la consulta
    function checkBoxMotivo() {
      if (motivo_consulta.indexOf('Otros') > -1) {
        return false;
      } else {
        return true;
      }
    }

    //CHECKBOX area receptora
    function checkBoxAreaReceptora() {
      if (vm.denuncia.area_receptora === 'Otros') {
        return false;
      } else {
        return true;
      }
    }

    //CHECKBOX vinculo familiar
    function checkBoxVinculoFamiliar() {
      if (vm.denuncia.vinculo_agresor === 'Familiar') {
        return false;
      } else {
        return true;
      }
    }

    //CHECKBOX vinculo otros
    function checkBoxVinculoOtros() {
      if (vm.denuncia.vinculo_agresor === 'Otros') {
        return false;
      } else {
        return true;
      }
    }

    // Remove existing Denuncia
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.denuncia.$remove($state.go('denuncias.list'));
      }
    }

    // Save Denuncia
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.denunciaForm');
        return false;
      }

      var provisorio_nombres = [];
      if(vm.denuncia.nombre_profesional !== undefined) {
        vm.denuncia.nombre_profesional.forEach(function(valor, indice, array) {
            provisorio_nombres.push(valor.trim());  
        });
        vm.denuncia.nombre_profesional = provisorio_nombres;
      }


      var provisorio_matricula = [];
      if(vm.denuncia.matricula_profesional !== undefined) {
        vm.denuncia.matricula_profesional.forEach(function(valor, indice, array) {
            provisorio_matricula.push(valor.trim());  
        });
        vm.denuncia.matricula_profesional = provisorio_matricula;
      }
      // TODO: move create/update logic to service
      if (vm.denuncia._id) {
        vm.denuncia.$update(successCallback, errorCallback);
      } else {
        vm.denuncia.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('denuncias.view', {
          denunciaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
