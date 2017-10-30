'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * chat Schema
 */
var chatSchema = new Schema({
    username: String, 
    message: String,
    profileImageURL: String,
    created: {type:Date,default:Date.now},
    classID: String
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;