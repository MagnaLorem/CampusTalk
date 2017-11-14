'use strict';

// Configure the 'chat' module routes
angular.module('payments').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('payments', {
                url: '/payments',
                templateUrl: 'modules/payments/views/payments.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });
    }
]);