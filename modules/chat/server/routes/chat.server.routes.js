'use strict';

var chatData = require('../controller/chat.server.controller.js');

module.exports = function(app){

    app.route('/api/chatHistory')
        .get(chatData.read)
        .post(chatData.savechat);

    app.route('/api/getAllChatData/:classID')
        .get(chatData.getAllchatData);

    app.route('/api/chat/picture')
        .post(chatData.savePicture);

    app.param('classID',chatData.getChatDataByCurrentClassID);
};