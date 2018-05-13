(function () {
  'use strict';

  angular
    .module('denuncias')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Denuncias',
      state: 'denuncias',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'denuncias', {
      title: 'Lista de Denuncias',
      state: 'denuncias.list',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'denuncias', {
      title: 'Cargar Denuncia',
      state: 'denuncias.create',
      roles: ['user', 'admin']
    });
  }
}());
