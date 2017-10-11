'use strict';

angular.module('users').controller('UserClassesController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
    
    /*
    $scope.addCourse(index) = function(myclass) {
    	$scope.userclass.push(myclass);
    }; 
    */
  }
]);
