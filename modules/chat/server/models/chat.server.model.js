'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * chat Schema
 */
var chatSchema = new Schema({
    classID: {type:String},
    messages:[{
      username: {type:String}, 
      message: {type:String},
      profileImageURL: {type:String},
      created: {type:Date,default:Date.now},
      fileURL:{type:String} //image file for chat
    }]
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;