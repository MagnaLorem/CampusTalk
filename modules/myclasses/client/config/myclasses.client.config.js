(function () {
  'use strict';

  angular
    .module('myclasses')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Myclasses',
      state: 'myclasses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'myclasses', {
      title: 'List Myclasses',
      state: 'myclasses.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'myclasses', {
      title: 'Create Myclass',
      state: 'myclasses.create',
      roles: ['user']
    });
  }
}());
