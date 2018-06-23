(function () {
  'use strict';

  angular
    .module('denuncias')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Registros',
      state: 'denuncias',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'denuncias', {
      title: 'Listar Registros',
      state: 'denuncias.list',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'denuncias', {
      title: 'Cargar Registro',
      state: 'denuncias.create',
      roles: ['user', 'admin']
    });
  }
}());
