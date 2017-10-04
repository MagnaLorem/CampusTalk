(function () {
  'use strict';

  angular
    .module('myclasses')
    .controller('MyclassesListController', MyclassesListController);

  MyclassesListController.$inject = ['MyclassesService'];

  function MyclassesListController(MyclassesService) {
    var vm = this;

    vm.myclasses = MyclassesService.query();
  }
}());
