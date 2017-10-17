'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Socket','chatService',
  function ($scope, $location, Authentication, Socket,chatService) {
    // Create a messages array
    $scope.messages = [];

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
      $location.path('/');
    }

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      $scope.messages.unshift(message);
    });

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      //debugger;
      var message = {
        text: this.messageText
      };

      //debugger;
      console.log("at chatService: chat.client.controller.js");
      chatService.saveChatData(message)
        .then(function(response){
          console.log("succefully saved chat data");
        },function(err){
          console.log(err);
      });
      
      
      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);
      

      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
]);
