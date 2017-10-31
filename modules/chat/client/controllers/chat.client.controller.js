'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Socket','chatService', 'UserclassesService', 
  function ($scope, $location, Authentication, Socket, chatService, UserclassesService) {
    // Create a messages array
    $scope.messages = [];
    $scope.UserName = Authentication.user.username;
    $scope.classes = [];
    
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
      $scope.messages.push(message);
    });

    $scope.getAllCourses = function(){
      // Find the user's classes through the factory
      UserclassesService.getUserclasses().then(function(response){
        for(var i = 0; i < response.data.courses.length; i++){
           // Push the courses into the user's class list
            $scope.classes.push(response.data.courses[i]);
          }
      });
    }

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

      //create a object to save to db
      var chatData = {
        "username": Authentication.user.username,
        "profileImageURL": Authentication.user.profileImageURL,
        "message" : this.messageText,
        "created" : Date.now()
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
