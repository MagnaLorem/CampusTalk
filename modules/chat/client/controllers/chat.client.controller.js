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

    $scope.retrieveChatAllData = function(){

      chatService.getAllChatData()
        .then(function(response){

          $scope.messages = response.data;
          console.log($scope.messages);
        },function(err){
          console.log(err);
        });
    }

    // Create a controller method for sending messages
    $scope.sendMessage = function () {

      //console.log(Authentication.user);
      //create a object to save to db
      var chatData = {
        "username": Authentication.user.username,
        "profileImageURL": Authentication.user.profileImageURL,
        "message" : this.messageText,
        "created" : Date.now() /*will be defined in Socket.emit */
      }
      
      chatService.saveChatData(chatData)
        .then(function(response){
          console.log("succefully saved chat data");
        },function(err){
          console.log(err);
      });
      
      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', chatData);
      
      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
]);
