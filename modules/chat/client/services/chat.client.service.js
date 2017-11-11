
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

    getAllChatData: function(currentlySelectedClassID) {
        return $http.get('/api/getAllChatData/'+ currentlySelectedClassID);
    },

  };

    return methods;
 }]);
}()

);