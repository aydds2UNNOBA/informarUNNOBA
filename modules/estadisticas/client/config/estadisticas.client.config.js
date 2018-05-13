(function () {
  'use strict';

  angular
    .module('estadisticas')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Estadisticas',
      state: 'estadisticas',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'estadisticas', {
      title: 'Consultar Estadisticas',
      state: 'estadisticas.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'estadisticas', {
      title: 'Administrar Indicadores',
      state: 'estadisticas.create',
      roles: ['admin']
    });
  }
}());
