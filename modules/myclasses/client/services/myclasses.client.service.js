// Myclasses service used to communicate Myclasses REST endpoints
(function () {
  'use strict';

  angular
    .module('myclasses')
    .factory('MyclassesService', MyclassesService);

  MyclassesService.$inject = ['$resource'];

  function MyclassesService($resource) {
    return $resource('api/myclasses/:myclassId', {
      myclassId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
