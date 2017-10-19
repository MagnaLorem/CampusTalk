'use strict';

// Create the chat configuration

var chatData = require('../models/chat.server.model.js');
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  io.emit('chatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.username
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (chatData) {
    console.log("message in socket chatMessage\n");
    //console.log(message);
    //var datatoJSON = JSON.stringify(message);
    //var data = JSON.parse(datatoJSON);
    /*
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;
    */
    //create the object to show 
    var Message = {
      message: chatData.message,
      type:'message',
      created: Date.now(),
      profileImageURL: chatData.profileImageURL,
      username: chatData.username
    }
    
    console.log("\ndisplayMessage");
    console.log(Message);

    io.emit('chatMessage', Message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.username
    });
  });

  socket.on('load old messages',function(docs){
    /*
    for(var i = 0; docs.length; i++){
      Socket.emit('chatMessage', docs[i]);
    }
    */
    console.log("emitting the data");
  });
};
