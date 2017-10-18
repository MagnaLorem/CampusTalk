
(function() {
'use strict';

angular.module('chat').factory('chatService', ['$http', function($http) {
  
  

  var methods = {
    
    saveChatData: function(message) {
      console.log("in chat.client.service.js post ");
      return $http.post('/api/chatHistory', message);
    },

    getChatData: function() {
      console.log("in chat.client.service.js get ");
        return $http.get('/api/chatHistory');
    }

  };

    return methods;
 }]);
}()

);