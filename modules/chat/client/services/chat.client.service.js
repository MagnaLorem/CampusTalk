
(function() {
'use strict';

angular.module('chat').factory('chatService', ['$http', function($http) {
  
  console.log("in chat.client.service.js");

  var methods = {
    
    getChatData: function() {
        return $http.get('http://localhost:8080/api/chatHistory');
    },

    saveChatData: function(message) {
      return $http.post('http://localhost:8080/api/chatHistory' + message);
    }

  };

    return methods;
 }]);
}()

);