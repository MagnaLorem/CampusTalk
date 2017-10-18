var path = require('path'),
    mongoose = require('mongoose'),
    chatData = require('../models/chat.server.model.js'),
    path = require('path'),
    config = require(path.resolve('./config/config')), /** not being used for now**/
    User = mongoose.model('User'),
    request = require('request');

var newChatData;

exports.savechat = function(req, res) {
  //console.log("savechat"); 
  newChatData = new chatData(req.body);
  newChatData.username = req.user.username;
  //console.log(req.user);

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
  console.log("read");
  /*
  newChatData.find({}, function(err,docs){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(docs);
    }
  });
  */
};

