'use strict';

var chatData = require('../controller/chat.server.controller.js');

module.exports = function(app){

    app.route('/api/chatHistory')
        .get(chatData.read)
        .post(chatData.savechat);

    app.route('/api/getAllChatData/:classID')
        .get(chatData.getAllchatData);

    app.param('classID',chatData.getChatDataByCurrentClassID);
};