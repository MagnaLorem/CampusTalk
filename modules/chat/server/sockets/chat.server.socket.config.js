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
  socket.on('chatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;
/*
    //chat model
    chatData.username = message.username;
    chatData.message = message.type;

    chatData.save(function(err){
      if(err){
        console.log(err);
        res.status(400).send(err);
      }else{
        console.log("successfully created: chatData:\n" + chatData);
        res.json(chatData);
      }
    });
  */
    io.emit('chatMessage', message);
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
