(function () {
  'use strict';

  angular
    .module('myclasses')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'My Classes',
      state: 'myclasses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'myclasses', {
      title: 'List My Classes',
      state: 'myclasses.list'
    });

  }
}());
