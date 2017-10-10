(function () {
  'use strict';

  angular
    .module('myclasses')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('myclasses', {
        abstract: true,
        url: '/myclasses',
        template: '<ui-view/>'
      })
      .state('myclasses.list', {
        url: '',
        templateUrl: 'modules/myclasses/views/list-myclasses.client.view.html',
        controller: 'MyclassesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Myclasses List'
        }
      })
      .state('myclasses.create', {
        url: '/create',
        templateUrl: 'modules/myclasses/views/form-myclass.client.view.html',
        controller: 'MyclassesController',
        controllerAs: 'vm',
        resolve: {
          myclassResolve: newMyclass
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Myclasses Create'
        }
      })
      .state('myclasses.edit', {
        url: '/:myclassId/edit',
        templateUrl: 'modules/myclasses/views/form-myclass.client.view.html',
        controller: 'MyclassesController',
        controllerAs: 'vm',
        resolve: {
          myclassResolve: getMyclass
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Myclass {{ myclassResolve.name }}'
        }
      })
      .state('myclasses.view', {
        url: '/:myclassId',
        templateUrl: 'modules/myclasses/views/view-myclass.client.view.html',
        controller: 'MyclassesController',
        controllerAs: 'vm',
        resolve: {
          myclassResolve: getMyclass
        },
        data: {
          pageTitle: 'Myclass {{ myclassResolve.name }}'
        }
      });
  }

  getMyclass.$inject = ['$stateParams', 'MyclassesService'];

  function getMyclass($stateParams, MyclassesService) {
    return MyclassesService.get({
      myclassId: $stateParams.myclassId
    }).$promise;
  }

  newMyclass.$inject = ['MyclassesService'];

  function newMyclass(MyclassesService) {
    return new MyclassesService();
  }
}());
