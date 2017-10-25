(function () {
    'use strict';

    angular
        .module('myclasses')
        .controller('MyclassesListController', MyclassesListController);

    MyclassesListController.$inject = ['$window', 'MyclassesService', 'Authentication', 'UserclassesService'];

    function MyclassesListController($window, MyclassesService, Authentication, UserclassesService) {
        var vm = this;

        vm.myclasses = MyclassesService.query();	// Grabs all of the classes from the db
        vm.authentication = Authentication;			// Grabs current user info from db

        /*
        vm.findUserclasses = function(){
          vm.userclasses = UserclassesService.getUserclasses();  // Find the user's classes
        }
        */

        vm.addCourse = function(myclass) {			// Add a course to the user's classes
            console.log("this is user data " + vm.authentication);
            console.log("dario" + vm.authentication.user.classes);
            var index = vm.myclasses.indexOf(myclass);
            vm.authentication.user.classes.push(vm.myclasses[index]);
            UserclassesService.updateUserclasses(vm.authentication.user._id, /*vm.authentication.user.classes*/ myclass);
            window.alert('Class added');
        };

        vm.deleteCourse = function(userclass) {
            if($window.confirm('Are you sure you want to delete the class?')) {
                var index = vm.authentication.user.classes.indexOf(userclass);  // Find in the index of the course in user's classes
                vm.authentication.user.classes.splice(index, 1);                // Delete from the list on the front end
                UserclassesService.updateUserclasses(vm.authentication.user._id, vm.authentication.user.classes);
            }
        }
    }
}());
