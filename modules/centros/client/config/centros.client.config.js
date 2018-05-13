(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
   /* menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Centros de Salud',
      state: 'centros',
      type: 'dropdown',
      roles: ['admin']
    });*/

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Agregar Centro de Salud',
      state: 'centros.create',
      roles: ['admin'],
      position: 3
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Listar Centros de Salud',
      state: 'centros.list',
      roles: ['admin'],
      position: 4
    });
  }
}());
