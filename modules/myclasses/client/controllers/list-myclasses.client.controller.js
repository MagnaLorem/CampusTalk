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
        vm.userclasses = [];                        // User's classes array

        vm.findCourses = function(){
          // Find the user's classes through the factory
          UserclassesService.getUserclasses(vm.authentication.user._id).then(function(response){
            console.log("User's classes from database: " + response.data);
            //vm.userclasses = response.data;
          });
        }

        vm.addCourse = function(myclass) {			// Add a course to the user's classes
            // Find the index of the class
            var index = vm.myclasses.indexOf(myclass);

            // Add class to the user's classes
            vm.userclasses.push(vm.myclasses[index]);

            // Alert the user that the class was added
            window.alert('Class added');
        };

        vm.addAllCourses = function() {             // Add all of the user's courses to db
            // Converting js array to String
            var classesToString = JSON.stringify(vm.userclasses);

            // Insert into new JSON object
            var courseData = {
                "userId": vm.authentication.user._id,
                "courses": JSON.parse(classesToString)  // Convert array string to JSON object
            }
            console.log("Courses added to database: " + courseData);

            // Add the course throught the factory
            UserclassesService.updateUserclasses(courseData);
        }

        vm.deleteCourse = function(userclass) {
            if($window.confirm('Are you sure you want to delete the class?')) {
                var index = vm.authentication.user.classes.indexOf(userclass);  // Find in the index of the course in user's classes
                vm.authentication.user.classes.splice(index, 1);                // Delete from the list on the front end
                UserclassesService.updateUserclasses(vm.authentication.user._id, vm.authentication.user.classes);
            }
        }
    }
}());
