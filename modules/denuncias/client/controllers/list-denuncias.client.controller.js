(function () {
  'use strict';

  angular
    .module('denuncias')
    .controller('DenunciasListController', DenunciasListController);

  DenunciasListController.$inject = ['DenunciasService', '$scope', '$filter', 'Admin'];

  function DenunciasListController(DenunciasService, $scope, $filter, Admin) {
    var vm = this;
    var campo_uno;
    var campo_dos;
    var campo_tres;
    var dos = true;
    var tres = true;
    var lista_2;
    var lista_3;

    $scope.campos_a_filtrar = [
                    'DNI de la Víctima',
                    'Sexo de la Víctima',
                    'Municipio de la Víctima',
                    'Localidad de la Víctima',
                    'Estado Civil de la Víctima',
                    'Ocupación de la Víctima',
                    'DNI del Consultante',
                    'Motivo de la Consulta',
                    'Vínculo con el Agresor',
                    'Fecha Desde',
                    'Fecha Hasta',
                    '¿Consultas Previas?',
                    '¿Consultas en otros Organismos?'];

    var motivo_consulta = [
    				'Violencia Física',
    				'Violencia Verbal y/o Psicológica',
    				'Violencia Sexual',
    				'Violencia Económica',
    				'Otros'];

	var vinculo_agresor = [
    				'Esposo',
    				'Concubino',
    				'Novio',
    				'Familiar',
    				'Otros'];

    var municipios = [
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

    var est_civiles = [
                    'Soltero/a',
                    'Casado/a',
                    'Viudo/a',
                    'Divorciado/a'];

    var ocupaciones_victima = [
                    'Desempleado/a',
                    'Empleado/a',
                    'Independiente',
                    'Otros'];

   var si_no = [
    				'Si',
    				'No'];

    var sexo_victima = [
                    'Femenino',
                    'Masculino'];

    document.getElementById('campo_filtro_2').disabled = true;
    document.getElementById('campo_filtro_3').disabled = true;

    DenunciasService.query(function (data) {
      $scope.denuncias = data;
      $scope.buildPager();
    });

    $scope.filtro1 = function() {

    	document.getElementById('opciones').style.display = 'none';
    	document.getElementById('texto_uno').style.display = 'none';
        document.getElementById('fecha_uno').style.display = 'none';
    	$scope.texto_uno = '';
    	$scope.opciones_uno = '';
    	$scope.opciones = '';
        $scope.fecha_uno = '';

    	if($scope.campo_elegido_1 === 'Ocupación de la Víctima') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = ocupaciones_victima;
    	} else if($scope.campo_elegido_1 === 'Sexo de la Víctima') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = sexo_victima;    	
    	} else if($scope.campo_elegido_1 === 'Estado Civil de la Víctima') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = est_civiles;
    	} else if($scope.campo_elegido_1 === 'Municipio de la Víctima') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = municipios;
    	} else if($scope.campo_elegido_1 === 'Vínculo con el Agresor') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = vinculo_agresor;
    	} else if($scope.campo_elegido_1 === 'Motivo de la Consulta') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = motivo_consulta;
    	} else if($scope.campo_elegido_1 === '¿Consultas Previas?') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = si_no;
    	} else if($scope.campo_elegido_1 === '¿Consultas en otros Organismos?') {
    		document.getElementById('opciones').style.display = 'block';
    		$scope.opciones = si_no;
    	} else if($scope.campo_elegido_1 === 'Fecha Desde') {
            document.getElementById('fecha_uno').style.display = 'block';
        } else if($scope.campo_elegido_1 === 'Fecha Hasta') {
            document.getElementById('fecha_uno').style.display = 'block';
        } else {
    		document.getElementById('texto_uno').style.display = 'block';
    	}
    	$scope.filteredItems = $scope.denuncias;
    	$scope.filtrarConsulta();
    }

    $scope.filtro2 = function() {
    	document.getElementById('campo_filtro_1').disabled = true;
    	document.getElementById('opciones').disabled = true;
    	document.getElementById('texto_uno').disabled = true;
        document.getElementById('fecha_uno').disabled = true;
    	document.getElementById('opciones_2').style.display = 'none';
    	document.getElementById('texto_2').style.display = 'none';
        document.getElementById('fecha_dos').style.display = 'none';
    	$scope.texto_dos = '';
    	$scope.opciones_dos = '';
    	$scope.opciones2 = '';
        $scope.fecha_dos = '';

    	if($scope.campo_elegido_2 === 'Ocupación de la Víctima') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = ocupaciones_victima;
    	} else if($scope.campo_elegido_2 === 'Sexo de la Víctima') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = sexo_victima;    	
    	} else if($scope.campo_elegido_2 === 'Estado Civil de la Víctima') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = est_civiles;
    	} else if($scope.campo_elegido_2 === 'Municipio de la Víctima') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = municipios;
    	} else if($scope.campo_elegido_2 === 'Vínculo con el Agresor') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = vinculo_agresor;
    	} else if($scope.campo_elegido_2 === 'Motivo de la Consulta') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = motivo_consulta;
    	} else if($scope.campo_elegido_2 === '¿Consultas Previas?') {
    		document.getElementById('opciones_2').style.display = 'block';
    		$scope.opciones2 = si_no;
    	} else if($scope.campo_elegido_2 === '¿Consultas en otros Organismos?') {
            document.getElementById('opciones_2').style.display = 'block';
            $scope.opciones2 = si_no;
        } else if($scope.campo_elegido_2 === 'Fecha Desde') {
            document.getElementById('fecha_dos').style.display = 'block';
        } else if($scope.campo_elegido_2 === 'Fecha Hasta') {
            document.getElementById('fecha_dos').style.display = 'block';
        } else {
    		document.getElementById('texto_2').style.display = 'block';
    	}

    	if(dos){
    		lista_2 = $scope.filteredItems;
    		dos = false;
    	} else if($scope.filteredItems === undefined || $scope.filteredItems.length < lista_2.length) {
    		$scope.filteredItems = lista_2
    	}

    	$scope.filtrarConsulta();
    }

    $scope.filtro3 = function() {
    	document.getElementById('campo_filtro_2').disabled = true;
    	document.getElementById('opciones_2').disabled = true;
    	document.getElementById('texto_2').disabled = true;
        document.getElementById('fecha_dos').disabled = true;
        document.getElementById('fecha_tres').style.display = 'none';
    	document.getElementById('opciones_3').style.display = 'none';
    	document.getElementById('texto_3').style.display = 'none';
    	$scope.texto_tres = '';
    	$scope.opciones_tres = '';
    	$scope.opciones3 = '';
        $scope.fecha_tres = '';

    	if($scope.campo_elegido_3 === 'Ocupación de la Víctima') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = ocupaciones_victima;
    	} else if($scope.campo_elegido_3 === 'Sexo de la Víctima') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = sexo_victima;    	
    	} else if($scope.campo_elegido_3 === 'Estado Civil de la Víctima') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = est_civiles;
    	} else if($scope.campo_elegido_3 === 'Municipio de la Víctima') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = municipios;
    	} else if($scope.campo_elegido_3 === 'Vínculo con el Agresor') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = vinculo_agresor;
    	} else if($scope.campo_elegido_3 === 'Motivo de la Consulta') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = motivo_consulta;
    	} else if($scope.campo_elegido_3 === '¿Consultas Previas?') {
    		document.getElementById('opciones_3').style.display = 'block';
    		$scope.opciones3 = si_no;
    	} else if($scope.campo_elegido_3 === '¿Consultas en otros Organismos?') {
            document.getElementById('opciones_3').style.display = 'block';
            $scope.opciones3 = si_no;
        } else if($scope.campo_elegido_3 === 'Fecha Desde') {
            document.getElementById('fecha_tres').style.display = 'block';
        } else if($scope.campo_elegido_3 === 'Fecha Hasta') {
            document.getElementById('fecha_tres').style.display = 'block';
        } else {
    		document.getElementById('texto_3').style.display = 'block';
    	}
    	
    	if(tres){
    		lista_3 = $scope.filteredItems;
    		tres = false;
    	} else if($scope.filteredItems === undefined || $scope.filteredItems.length < lista_3.length) {
    		$scope.filteredItems = lista_3;
    	}

    	$scope.filtrarConsulta();
    }

    $scope.filtrarConsulta = function () {
    	$scope.filterLength = $scope.filteredItems.length;
		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		var end = begin + $scope.itemsPerPage;
		$scope.pagedItems = $scope.filteredItems.slice(begin, end);
    }

    $scope.figureOutItemsToDisplay = function () {
    	if($scope.opciones_uno !== undefined) {
    		document.getElementById('campo_filtro_2').disabled = false;
    	}
    	if($scope.campo_elegido_1 === 'Ocupación de la Víctima') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'ocupacion_victima' : $scope.opciones_uno});
			//$: $scope.search //pones los campos del modelo que queres filtrar

    	} else if($scope.campo_elegido_1 === 'Sexo de la Víctima') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'sexo_victima' : $scope.opciones_uno});
  	
    	} else if($scope.campo_elegido_1 === 'Estado Civil de la Víctima') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'estado_civil_victima' : $scope.opciones_uno});

    	} else if($scope.campo_elegido_1 === 'Municipio de la Víctima') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'municipio_victima' : $scope.opciones_uno});

    	} else if($scope.campo_elegido_1 === 'Vínculo con el Agresor') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'vinculo_agresor' : $scope.opciones_uno});

    	} else if($scope.campo_elegido_1 === 'Motivo de la Consulta') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'motivo_consulta' : $scope.opciones_uno});

    	} else if($scope.campo_elegido_1 === '¿Consultas Previas?') {
    		var respuesta_consulta;
    		if($scope.opciones_uno === 'Si') {
    			respuesta_consulta = true;
    		} else if($scope.opciones_uno === 'No') {
    			respuesta_consulta = false;
    		}    		
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'consultas_previas' : respuesta_consulta});

    	} else if($scope.campo_elegido_1 === '¿Consultas en otros Organismos?') {
    		var respuesta_consulta_organismo;
    		if($scope.opciones_uno === 'Si') {
    			respuesta_consulta_organismo = true;
    		} else if($scope.opciones_uno === 'No') {
    			respuesta_consulta_organismo = false;
    		} 
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'otras_denuncias' : respuesta_consulta_organismo});

    	} else if($scope.campo_elegido_1 === 'DNI de la Víctima') {
            $scope.filteredItems = $filter('filter')($scope.denuncias, {
                'dni_victima' : $scope.texto_uno});

        } else if($scope.campo_elegido_1 === 'Fecha Desde') {
            /*$scope.filteredItems = $filter('filter')($scope.denuncias, {
                'created' : $scope.fecha_uno});*/
            $scope.filteredItems = $scope.denuncias.filter(
                function(item) {
                    let fechaCaja = new Date($scope.fecha_uno);
                    let fechaDenuncia = new Date(item.created);
                    return (fechaDenuncia) > fechaCaja;
                });

        } else if($scope.campo_elegido_1 === 'Fecha Hasta') {
            /*$scope.filteredItems = $filter('filter')($scope.denuncias, {
                'created' : $scope.fecha_uno});*/
            $scope.filteredItems = $scope.denuncias.filter(
                function(item) {
                    let fechaCaja = new Date($scope.fecha_uno);
                    let fechaDenuncia = new Date(item.created);
                    return (fechaDenuncia) < fechaCaja;
                });

        } else if($scope.campo_elegido_1 === 'Localidad de la Víctima') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'localidad_victima' : $scope.texto_uno});

    	} else if($scope.campo_elegido_1 === 'DNI del Consultante') {
    		$scope.filteredItems = $filter('filter')($scope.denuncias, {
    			'dni_consultante' : $scope.texto_uno});

    	} else {
    		$scope.filteredItems = $scope.denuncias;
    	}
    	$scope.filtrarConsulta();
    };

    $scope.figureOutItemsToDisplay2 = function () {
		if($scope.opciones_dos !== undefined) {
    		document.getElementById('campo_filtro_3').disabled = false;
    	}

    	if($scope.campo_elegido_2 === 'Ocupación de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'ocupacion_victima' : $scope.opciones_dos});
			//$: $scope.search //pones los campos del modelo que queres filtrar

    	} else if($scope.campo_elegido_2 === 'Sexo de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'sexo_victima' : $scope.opciones_dos});
  	
    	} else if($scope.campo_elegido_2 === 'Estado Civil de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'estado_civil_victima' : $scope.opciones_dos});

    	} else if($scope.campo_elegido_2 === 'Municipio de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'municipio_victima' : $scope.opciones_dos});

    	} else if($scope.campo_elegido_2 === 'Vínculo con el Agresor') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'vinculo_agresor' : $scope.opciones_dos});

    	} else if($scope.campo_elegido_2 === 'Motivo de la Consulta') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'motivo_consulta' : $scope.opciones_dos});

    	} else if($scope.campo_elegido_2 === '¿Consultas Previas?') {
    		var respuesta_consulta2;
    		if($scope.opciones_dos === 'Si') {
    			respuesta_consulta2 = true;
    		} else if($scope.opciones_dos === 'No') {
    			respuesta_consulta2 = false;
    		}    		
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'consultas_previas' : respuesta_consulta2});

    	} else if($scope.campo_elegido_2 === '¿Consultas en otros Organismos?') {
    		var respuesta_consulta_organismo2;
    		if($scope.opciones_dos === 'Si') {
    			respuesta_consulta_organismo2 = true;
    		} else if($scope.opciones_dos === 'No') {
    			respuesta_consulta_organismo2 = false;
    		} 
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'otras_denuncias' : respuesta_consulta_organismo2});

    	} else if($scope.campo_elegido_2 === 'DNI de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'dni_victima' : $scope.texto_dos});

    	} else if($scope.campo_elegido_2 === 'Localidad de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'localidad_victima' : $scope.texto_dos});

    	} else if($scope.campo_elegido_2 === 'DNI del Consultante') {
    		$scope.filteredItems = $filter('filter')(lista_2, {
    			'dni_consultante' : $scope.texto_dos});

    	} else if($scope.campo_elegido_2 === 'Fecha Desde') {
            $scope.filteredItems = lista_2.filter(
                function(item) {
                    let fechaCajaDos = new Date($scope.fecha_dos);
                    let fechaDenunciados = new Date(item.created);
                    return (fechaDenunciados) > fechaCajaDos;
                });

        } else if($scope.campo_elegido_2 === 'Fecha Hasta') {
            $scope.filteredItems = lista_2.filter(
                function(item) {
                    let fechaCajaDos = new Date($scope.fecha_dos);
                    let fechaDenunciaDos = new Date(item.created);
                    return (fechaDenunciaDos) < fechaCajaDos;
                });

        }
    	$scope.filtrarConsulta();
    };

    $scope.figureOutItemsToDisplay3 = function () {

    	if($scope.campo_elegido_3 === 'Ocupación de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'ocupacion_victima' : $scope.opciones_tres});
			//$: $scope.search //pones los campos del modelo que queres filtrar

    	} else if($scope.campo_elegido_3 === 'Sexo de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'sexo_victima' : $scope.opciones_tres});
  	
    	} else if($scope.campo_elegido_3 === 'Estado Civil de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'estado_civil_victima' : $scope.opciones_tres});

    	} else if($scope.campo_elegido_3 === 'Municipio de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'municipio_victima' : $scope.opciones_tres});

    	} else if($scope.campo_elegido_3 === 'Vínculo con el Agresor') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'vinculo_agresor' : $scope.opciones_tres});

    	} else if($scope.campo_elegido_3 === 'Motivo de la Consulta') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'motivo_consulta' : $scope.opciones_tres});

    	} else if($scope.campo_elegido_3 === '¿Consultas Previas?') {
    		var respuesta_consulta2;
    		if($scope.opciones_tres === 'Si') {
    			respuesta_consulta2 = true;
    		} else if($scope.opciones_tres === 'No') {
    			respuesta_consulta2 = false;
    		}    		
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'consultas_previas' : respuesta_consulta2});

    	} else if($scope.campo_elegido_3 === '¿Consultas en otros Organismos?') {
    		var respuesta_consulta_organismo3;
    		if($scope.opciones_tres === 'Si') {
    			respuesta_consulta_organismo3 = true;
    		} else if($scope.opciones_tres === 'No') {
    			respuesta_consulta_organismo3 = false;
    		} 
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'otras_denuncias' : respuesta_consulta_organismo3});

    	} else if($scope.campo_elegido_3 === 'DNI de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'dni_victima' : $scope.texto_tres});

    	} else if($scope.campo_elegido_3 === 'Localidad de la Víctima') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'localidad_victima' : $scope.texto_tres});

    	} else if($scope.campo_elegido_3 === 'DNI del Consultante') {
    		$scope.filteredItems = $filter('filter')(lista_3, {
    			'dni_consultante' : $scope.texto_tres});

    	} else if($scope.campo_elegido_3 === 'Fecha Desde') {
            $scope.filteredItems = lista_3.filter(
                function(item) {
                    let fechaCajaTres = new Date($scope.fecha_tres);
                    let fechaDenunciaTres = new Date(item.created);
                    return (fechaDenunciaTres) > fechaCajaTres;
                });

        } else if($scope.campo_elegido_3 === 'Fecha Hasta') {
            $scope.filteredItems = lista_3.filter(
                function(item) {
                    let fechaCajaTres = new Date($scope.fecha_tres);
                    let fechaDenunciaTres = new Date(item.created);
                    return (fechaDenunciaTres) < fechaCajaTres;
                });

        }
    	$scope.filtrarConsulta();
    };

    $scope.buildPager = function () {
		$scope.pagedItems = [];
		$scope.itemsPerPage = 8;
		$scope.currentPage = 1;
		$scope.figureOutItemsToDisplay();
    };

    $scope.pageChanged = function () {
		$scope.figureOutItemsToDisplay();
    };
    $scope.reiniciar = function () {
        document.getElementById('opciones').style.display = 'none';
        document.getElementById('texto_uno').style.display = 'none';
        document.getElementById('fecha_uno').style.display = 'none';
        document.getElementById('opciones_2').style.display = 'none';
        document.getElementById('texto_2').style.display = 'none';
        document.getElementById('fecha_dos').style.display = 'none';
        document.getElementById('fecha_tres').style.display = 'none';
        document.getElementById('opciones_3').style.display = 'none';
        document.getElementById('texto_3').style.display = 'none';
        document.getElementById('campo_filtro_2').disabled = true;
        document.getElementById('opciones_2').disabled = false;
        document.getElementById('texto_2').disabled = false;
        document.getElementById('fecha_dos').disabled = false;
        document.getElementById('campo_filtro_3').disabled = true;
        document.getElementById('opciones_3').disabled = false;
        document.getElementById('texto_3').disabled = false;
        document.getElementById('fecha_tres').disabled = false;
        document.getElementById('campo_filtro_1').disabled = false;
        document.getElementById('opciones').disabled = false;
        document.getElementById('texto_uno').disabled = false;
        document.getElementById('fecha_uno').disabled = false;
        $scope.texto_uno = '';
        $scope.opciones_uno = '';
        $scope.opciones = '';
        $scope.fecha_uno = '';
        $scope.texto_dos = '';
        $scope.opciones_dos = '';
        $scope.opciones2 = '';
        $scope.fecha_dos = '';
        $scope.texto_tres = '';
        $scope.opciones_tres = '';
        $scope.opciones3 = '';
        $scope.fecha_tres = '';
        $scope.filteredItems = $scope.denuncias;
        $scope.filtrarConsulta();
        document.getElementById('campo_filtro_1').selectedIndex = 'Campos de Filtrado';
        document.getElementById('campo_filtro_2').selectedIndex = 'Campos de Filtrado';
        document.getElementById('campo_filtro_3').selectedIndex = 'Campos de Filtrado';
    };

  }
}());
