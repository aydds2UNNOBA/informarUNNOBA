(function () {
  'use strict';

  angular
    .module('centros')
    .controller('CentrosListController', CentrosListController);

  CentrosListController.$inject = ['CentrosService'];

  function CentrosListController(CentrosService) {
    var vm = this;

    vm.centros = CentrosService.query();
  
  }



}());
