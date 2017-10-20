
(function() {
'use strict';

angular.module('chat').factory('chatService', ['$http', function($http) {
  
  var methods = {
    
    saveChatData: function(message) {
      return $http.post('/api/chatHistory', message);
    },

    getChatData: function() {
        return $http.get('/api/chatHistory');
    },

    getAllChatData: function() {
        return $http.get('/api/getAllChatData');
    },

  };

    return methods;
 }]);
}()

);