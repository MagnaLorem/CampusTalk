'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/users/views/authentication/signin.client.view.html'
      })

    .state('home-signedIn', {
      url: '/home-signedIn',
      templateUrl: 'modules/myclasses/views/list-myclasses.client.view.html',
      controller: 'MyclassesListController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Myclasses List'
      }
    })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      });
  }
]);
