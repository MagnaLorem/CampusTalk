(function () {
  'use strict';

  angular
    .module('myclasses')
    .controller('MyclassesListController', MyclassesListController);

  MyclassesListController.$inject = ['MyclassesService', 'Authentication'];

  function MyclassesListController(MyclassesService, Authentication) {
    var vm = this;

    vm.myclasses = MyclassesService.query();	// Grabs all of the classes from the db
    vm.authentication = Authentication;			// Grabs current user info from db

    vm.addCourse = function(myclass) {			// Add a course to the user's classes
    	var index = vm.myclasses.indexOf(myclass);
    	vm.authentication.user.classes.push(vm.myclasses[index]);
    	//vm.authentication.user.$update(vm.authentication.user._id, classes );
    }; 
  }
}());
