'use strict';

// Configuring the Chat module
angular.module('payments').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', {
            title: 'Payments',
            state: 'payments'
        });
    }
]);