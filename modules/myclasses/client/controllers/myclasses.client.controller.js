(function () {
  'use strict';

  // Myclasses controller
  angular
    .module('myclasses')
    .controller('MyclassesController', MyclassesController);

  MyclassesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'myclassResolve'];

  function MyclassesController ($scope, $state, $window, Authentication, myclass) {
    var vm = this;

    vm.authentication = Authentication;
    vm.myclass = myclass;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Myclass
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.myclass.$remove($state.go('myclasses.list'));
      }
    }

    // Save Myclass
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.myclassForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.myclass._id) {
        vm.myclass.$update(successCallback, errorCallback);
      } else {
        vm.myclass.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('myclasses.view', {
          myclassId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
