(function() {
'use strict';

angular.module('myclasses').factory('UserclassesService', ['$http', function($http) {
  
  var methods = {
    
    updateUserclasses: function(courseData) {
		return $http.put('/api/userclasses/', courseData);
	},

    getUserclasses: function() {
		return $http.get('/api/userclasses/');
	}
  };

    return methods;
 }]);
}()

);