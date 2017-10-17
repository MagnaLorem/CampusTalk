'use strict';

var chatData = require('../controller/chat.server.controller.js');

module.exports = function(app){

    app.route('http://localhost:8080/api/chatHistory')
        .get(chatData.read)
        .post(chatData.savechat);

};