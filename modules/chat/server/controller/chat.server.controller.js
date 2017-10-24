var path = require('path'),
    mongoose = require('mongoose'),
    chatData = require('../models/chat.server.model.js'),
    path = require('path'),
    config = require(path.resolve('./config/config')), /** not being used for now**/
    User = mongoose.model('User'),
    request = require('request');

/*object for chat data */
var newChatData;

exports.savechat = function(req, res) {

  newChatData = new chatData(req.body);
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

//displays all info to /api/chatHistory
exports.read = function(req,res){

 chatData.find({}, function(err,docs){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(docs);
    }
  });
};

//obtain chat data when the page is loaded. 
//sort by the created date
exports.getAllchatData = function(req,res){

   chatData.find().sort('created').exec(function(err,docs){
      if(err){
        res.status(400).send(err);
      }else{
        res.send(docs);
      }
    });
  };

