'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * chat Schema
 */
var chatSchema = new Schema({
    username: String,
    message: String,
    createdTime: {type:Date,default:Date.now}
});

var Chat = mongoose.model('chatschema', chatSchema);

//modules.exports = Chat;