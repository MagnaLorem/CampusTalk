(function() {
'use strict';

angular.module('myclasses').factory('UserclassesService', ['$http', function($http) {
  
  var methods = {
    
    updateUserclasses: function(userId, classes) {
		return $http.put('api/userclasses/', {userId, classes});
	},

    getUserclasses: function() {
		return $http.get('api/userclasses');
	}
  };

    return methods;
 }]);
}()

);