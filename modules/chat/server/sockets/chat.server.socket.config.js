'use strict';

// Create the chat configuration

var chatData = require('../models/chat.server.model.js');
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  io.emit('message', "A user has connected");

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (chatData) {
    console.log("message in socket chatMessage\n");
    console.log("charData : \n");
    console.log(chatData.message);
   // socket.join(chatData.classID);
    //create the chat object to show
    var Message = {
      message: chatData.message,
      type:'message',
      created: Date.now(),
      profileImageURL: chatData.profileImageURL,
      username: chatData.username,
      classID: chatData.classID
    }

    console.log("\ndisplayMessage");
    console.log(Message);

    io.in(socket.room).emit('chatMessage', Message);
  });

  // Switch the room
  socket.on('switchRoom', function(newRoom){
    console.log("======== Old Room ========");
    console.log(socket.room);
    console.log("==========================\n");

    // Leave the current room
    socket.leave(socket.room);

    // Join the new room
    socket.room = newRoom;
    socket.join(newRoom);


    console.log("======= New Room =======");
    console.log(socket.room);
    console.log("========================\n");
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

};
