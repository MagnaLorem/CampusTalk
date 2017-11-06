(function() {
'use strict';

angular.module('myclasses').factory('UserclassesService', ['$http', function($http) {
  
  var methods = {
    
    updateUserclasses: function(myclass) {
		return $http.put('/api/userclasses/', myclass);
	},

    getUserclasses: function() {
		return $http.get('/api/userclasses/');
	},

	deleteUserclass: function(userclass) {
		return $http.put('/api/userclasses/deleteclass', userclass);
	}
  };

    return methods;
 }]);
}()

);