'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location','$window','$timeout', 'Authentication', 'Socket','chatService', 'UserclassesService','FileUploader',
  function ($scope, $location,$window,$timeout, Authentication, Socket, chatService, UserclassesService,FileUploader) {
    // Create a messages array
    $scope.messages = [];
    $scope.UserName = Authentication.user.username;
    $scope.classes = [];
    $scope.currentlySelectedClassID;
    $scope.isDefaultSet = false;
    $scope.saveFileItem; // save FileItem if file is uploaded
    $scope.saveFileReader; //save FileReader if file is uploaded
    $scope.user = Authentication.user;
    $scope.imageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/chat/picture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      
    console.log("uploader.onAfterAddingFile in chat module");
    console.log("fileItem = ");
    console.log(fileItem);
    console.log("fileItem._file = ");
    console.log(fileItem._file);
    console.log("$window.FileReader = ");
    console.log($window.FileReader);
    $scope.saveFileItem = fileItem;
    console.log("$scope.saveFileItem = ");
    console.log($scope.saveFileItem);

      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);
      //  fileReader.readAsArrayBuffer(fileItem._file);
        $scope.saveFileReader = fileReader; // save fileReader

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }

      console.log("$scope.imageURL");
      console.log($scope.imageURL);
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      
      console.log("uploadProfilePicture in chat module");
      // Clear messages
      $scope.success = $scope.error = null;
      console.log("$scope.uploader");
      console.log($scope.uploader);
      
      // Start upload
      $scope.uploader.uploadAll();
      console.log("after uploadAll");
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };

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

    $scope.setDefaultClassId = function(selectedClass){

      if(!$scope.isDefaultSet){
        $scope.currentlySelectedClassID = selectedClass.classId;

        // Switch which room to chat to
        switchRoom();

        //retreived the default chat history
        if(!$scope.isDefaultSet){
          chatService.getAllChatData($scope.currentlySelectedClassID)
          .then(function(response){
            getMessagesForSelectedClass(response);
          },function(err){
            console.log(err);
          });
        }

        $scope.isDefaultSet = true;
      }
    }

    function getMessagesForSelectedClass(response){
      $scope.messages = [];

      if(response.data != null){//if the selected class has no conversation
        for(var i = 0;i<response.data.messages.length;i++){
          $scope.messages.push(response.data.messages[i]);
        }
      }

      console.log($scope.messages);
    }
    //check if message array is empty
      $scope.checkMessageArray = function(messageArray){
        if(messageArray.length === 0){
          return true;
        }
      }

    // function not used
    $scope.getClassInfoOnChatPage = function(selectedClass){
      $scope.currentlySelectedClassID = selectedClass.classId;
      console.log("currentlySelectedClassID : " + $scope.currentlySelectedClassID+"\n");

    }// end of getClassInfoOnChatPage

    $scope.getAllCourses = function(){
      // Find the user's classes through the factory
      UserclassesService.getUserclasses().then(function(response){
        for(var i = 0; i < response.data.courses.length; i++){
           // Push the courses into the user's class list
            $scope.classes.push(response.data.courses[i]);
          }
      });
    }

    $scope.retrieveSelectedChat = function(selectedClass){

      if($scope.currentlySelectedClassID != selectedClass.classId){
        //update the selected classID
        $scope.currentlySelectedClassID = selectedClass.classId;

        // Switch which room to chat to
        switchRoom();

        chatService.getAllChatData($scope.currentlySelectedClassID)
          .then(function(response){
            getMessagesForSelectedClass(response);
          },function(err){
            console.log(err);
          });
      }
    }

    // Create a controller method for sending messages
    $scope.sendMessage = function () {

      var fileURL = "/modules/chat/client/img/" + $scope.saveFileItem.file.name;
      console.log("++++++++++++++++++++++++++");
      console.log(fileURL);
      console.log("++++++++++++++++++++++++++");

      if($scope.imageURL){
        var chatData = {
          "username": Authentication.user.username,
          "profileImageURL": Authentication.user.profileImageURL,
          "message" : this.messageText,
          "created" : Date.now(),
          "classID" : $scope.currentlySelectedClassID,
          "fileURL": fileURL
        }
      }else{
        var chatData = {
          "username": Authentication.user.username,
          "profileImageURL": Authentication.user.profileImageURL,
          "message" : this.messageText,
          "created" : Date.now(),
          "classID" : $scope.currentlySelectedClassID,
          "fileURL": ""
        }
      }

      console.log(chatData);

      //check if the message is empty
      if(this.messageText != '' && typeof(this.messageText) !== 'undefined'){
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
      }
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });

    // Function to switch the chat room
    function switchRoom(){
      // Grab the current classId and convert it to String
      var room = $scope.currentlySelectedClassID.toString();

      // Switch rooms using socket.io function
      Socket.emit('switchRoom', room);
    }

  }
]);
