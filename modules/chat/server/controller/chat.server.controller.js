var path = require('path'),
    mongoose = require('mongoose'),
    chatData = require('../models/chat.server.model.js'),
    path = require('path'),
    config = require(path.resolve('./config/config')), /** not being used for now**/
    User = mongoose.model('User'),
    request = require('request');


exports.savechat = function(req, res) {
  debugger;
  var newChatData = new chatData(req.body);
  //myclass.user = req.user;

  newChatData.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("Successfully created chat data!\n " + newChatData);
      res.json(newChatData);
    }
  });
};

exports.read = function(req,res){
  var duc = req.measurement ? req.measurement.toJSON() : {};

  res.jsonp(req.measurement);
};