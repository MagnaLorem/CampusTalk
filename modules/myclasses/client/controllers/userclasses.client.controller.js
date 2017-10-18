'use strict';

angular.module('users').controller('UserClassesController', ['$scope', 'Myclass', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
    
    $scope.addCourse(index) = function(index) {
    	$scope.user.classes.push(this.myclasses[index]._id)
    }; 
  }
]);